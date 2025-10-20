import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { Button } from '@nextui-org/react';
import { Input } from '@nextui-org/react';
import { Textarea } from '@nextui-org/react';
import { Select, SelectItem } from '@nextui-org/react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';
import { Chip } from '@nextui-org/react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/react';
import { Image } from '@nextui-org/react';
import { stampApi, uploadApi } from '@/routes/pages/Admin/adminApi';

interface Stamp {
  id: number;
  name: string;
  stampType: string;
  description: string;
  imgUrl: string;
  sorted: number;
  disabled: boolean;
  createdAt: number;
  updatedAt: number;
}

const STAMP_TYPES = [
  { key: 'achievement', label: '成就徽章' },
  { key: 'participation', label: '参与徽章' },
  { key: 'special', label: '特殊徽章' },
  { key: 'milestone', label: '里程碑徽章' },
];

export const StampManagement = () => {
  const [stamps, setStamps] = useState<Stamp[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);
  
  // 编辑/创建模态框
  const { isOpen: isEditOpen, onOpen: onEditOpen, onOpenChange: onEditOpenChange } = useDisclosure();
  const [editingStamp, setEditingStamp] = useState<Stamp | null>(null);
  const [stampForm, setStampForm] = useState({
    name: '',
    stampType: '',
    description: '',
    imgUrl: '',
    sorted: 0,
    disabled: false,
  });
  const [uploading, setUploading] = useState(false);

  // 加载徽章列表
  const loadStamps = async () => {
    try {
      setLoading(true);
      const response = await stampApi.getList(page, pageSize);
      if (response.code === '200') {
        setStamps(response.list);
        setTotal(parseInt(response.total));
      }
    } catch (error) {
      console.error('加载徽章列表失败:', error);
      setMessage('加载徽章列表失败');
    } finally {
      setLoading(false);
    }
  };

  // 文件上传
  const handleFileUpload = async (file: File) => {
    try {
      setUploading(true);
      const response = await uploadApi.upload(file);
      if (response.code === '200') {
        setStampForm(prev => ({ ...prev, imgUrl: response.fileUrl }));
        setMessage('图片上传成功');
      } else {
        setMessage('图片上传失败');
      }
    } catch (error) {
      console.error('图片上传失败:', error);
      setMessage('图片上传失败');
    } finally {
      setUploading(false);
    }
  };

  // 保存徽章
  const saveStamp = async () => {
    try {
      setLoading(true);
      const response = editingStamp
        ? await stampApi.update(editingStamp.id, stampForm)
        : await stampApi.create(stampForm);
      
      if (response.code === '200') {
        setMessage(editingStamp ? '徽章更新成功' : '徽章创建成功');
        onEditOpenChange();
        resetForm();
        loadStamps();
      } else {
        setMessage(response.msg || '操作失败');
      }
    } catch (error) {
      console.error('保存徽章失败:', error);
      setMessage('保存徽章失败');
    } finally {
      setLoading(false);
    }
  };

  // 删除徽章
  const deleteStamp = async (id: number) => {
    if (!confirm('确定要删除这个徽章吗？')) return;
    
    try {
      setLoading(true);
      const response = await stampApi.delete(id);
      if (response.code === '200') {
        setMessage('徽章删除成功');
        loadStamps();
      } else {
        setMessage(response.msg || '删除失败');
      }
    } catch (error) {
      console.error('删除徽章失败:', error);
      setMessage('删除徽章失败');
    } finally {
      setLoading(false);
    }
  };

  // 重置表单
  const resetForm = () => {
    setStampForm({
      name: '',
      stampType: '',
      description: '',
      imgUrl: '',
      sorted: 0,
      disabled: false,
    });
    setEditingStamp(null);
  };

  // 打开编辑模态框
  const openEditModal = (stamp?: Stamp) => {
    if (stamp) {
      setEditingStamp(stamp);
      setStampForm({
        name: stamp.name,
        stampType: stamp.stampType,
        description: stamp.description,
        imgUrl: stamp.imgUrl,
        sorted: stamp.sorted,
        disabled: stamp.disabled,
      });
    } else {
      resetForm();
    }
    onEditOpen();
  };

  // 格式化时间
  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString('zh-CN');
  };

  useEffect(() => {
    loadStamps();
  }, [page]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">徽章管理</h3>
          <Button color="primary" onPress={() => openEditModal()}>
            创建徽章
          </Button>
        </CardHeader>
        <CardBody>
          {/* 徽章列表 */}
          <Table aria-label="徽章列表">
            <TableHeader>
              <TableColumn>ID</TableColumn>
              <TableColumn>图片</TableColumn>
              <TableColumn>名称</TableColumn>
              <TableColumn>类型</TableColumn>
              <TableColumn>排序</TableColumn>
              <TableColumn>状态</TableColumn>
              <TableColumn>创建时间</TableColumn>
              <TableColumn>操作</TableColumn>
            </TableHeader>
            <TableBody>
              {stamps.map((stamp) => (
                <TableRow key={stamp.id}>
                  <TableCell>{stamp.id}</TableCell>
                  <TableCell>
                    <Image
                      src={stamp.imgUrl}
                      alt={stamp.name}
                      width={40}
                      height={40}
                      className="rounded"
                    />
                  </TableCell>
                  <TableCell>{stamp.name}</TableCell>
                  <TableCell>
                    {STAMP_TYPES.find(type => type.key === stamp.stampType)?.label || stamp.stampType}
                  </TableCell>
                  <TableCell>{stamp.sorted}</TableCell>
                  <TableCell>
                    <Chip
                      color={stamp.disabled ? 'danger' : 'success'}
                      variant="flat"
                    >
                      {stamp.disabled ? '禁用' : '启用'}
                    </Chip>
                  </TableCell>
                  <TableCell>{formatTime(stamp.createdAt)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        color="primary"
                        variant="flat"
                        onClick={() => openEditModal(stamp)}
                      >
                        编辑
                      </Button>
                      <Button
                        size="sm"
                        color="danger"
                        variant="flat"
                        onClick={() => deleteStamp(stamp.id)}
                        isLoading={loading}
                      >
                        删除
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* 分页 */}
          <div className="flex justify-center mt-4">
            <Button
              isDisabled={page === 1}
              onClick={() => setPage(page - 1)}
              variant="flat"
            >
              上一页
            </Button>
            <span className="mx-4 flex items-center">
              第 {page} 页，共 {Math.ceil(total / pageSize)} 页
            </span>
            <Button
              isDisabled={page >= Math.ceil(total / pageSize)}
              onClick={() => setPage(page + 1)}
              variant="flat"
            >
              下一页
            </Button>
          </div>

          {/* 消息提示 */}
          {message && (
            <div className={`mt-4 p-3 rounded-md ${
              message.includes('成功') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            }`}>
              {message}
            </div>
          )}
        </CardBody>
      </Card>

      {/* 编辑/创建徽章模态框 */}
      <Modal isOpen={isEditOpen} onOpenChange={onEditOpenChange} size="2xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {editingStamp ? '编辑徽章' : '创建徽章'}
              </ModalHeader>
              <ModalBody className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="徽章名称"
                    placeholder="请输入徽章名称"
                    value={stampForm.name}
                    onChange={(e) => setStampForm(prev => ({ ...prev, name: e.target.value }))}
                  />
                  <Select
                    label="徽章类型"
                    placeholder="请选择徽章类型"
                    selectedKeys={stampForm.stampType ? [stampForm.stampType] : []}
                    onSelectionChange={(keys) => {
                      const selected = Array.from(keys)[0] as string;
                      setStampForm(prev => ({ ...prev, stampType: selected }));
                    }}
                  >
                    {STAMP_TYPES.map((type) => (
                      <SelectItem key={type.key} value={type.key}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                
                <Textarea
                  label="徽章描述"
                  placeholder="请输入徽章描述"
                  value={stampForm.description}
                  onChange={(e) => setStampForm(prev => ({ ...prev, description: e.target.value }))}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    type="number"
                    label="排序"
                    placeholder="数字越小越靠前"
                    value={stampForm.sorted.toString()}
                    onChange={(e) => setStampForm(prev => ({ 
                      ...prev, 
                      sorted: parseInt(e.target.value) || 0 
                    }))}
                  />
                  <div className="flex items-center gap-2">
                    <label className="text-sm">状态:</label>
                    <Chip
                      color={stampForm.disabled ? 'danger' : 'success'}
                      variant="flat"
                    >
                      {stampForm.disabled ? '禁用' : '启用'}
                    </Chip>
                    <Button
                      size="sm"
                      color={stampForm.disabled ? 'success' : 'danger'}
                      variant="flat"
                      onClick={() => setStampForm(prev => ({ ...prev, disabled: !prev.disabled }))}
                    >
                      {stampForm.disabled ? '启用' : '禁用'}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">徽章图片</label>
                  <div className="flex gap-4 items-center">
                    {stampForm.imgUrl && (
                      <Image
                        src={stampForm.imgUrl}
                        alt="徽章预览"
                        width={80}
                        height={80}
                        className="rounded"
                      />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleFileUpload(file);
                        }
                      }}
                      className="hidden"
                      id="stamp-image-upload"
                    />
                    <Button
                      as="label"
                      htmlFor="stamp-image-upload"
                      color="primary"
                      variant="flat"
                      isLoading={uploading}
                    >
                      上传图片
                    </Button>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  取消
                </Button>
                <Button color="primary" onPress={saveStamp} isLoading={loading}>
                  {editingStamp ? '更新' : '创建'}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
