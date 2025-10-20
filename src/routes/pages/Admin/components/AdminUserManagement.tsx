import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { Button } from '@nextui-org/react';
import { Input } from '@nextui-org/react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';
import { Chip } from '@nextui-org/react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/react';
import { adminUserApi, userApi } from '@/routes/pages/Admin/adminApi';

interface AdminUser {
  id: number;
  address: string;
  name: string;
  status: number;
  createdAt: number;
  updatedAt: number;
}

interface User {
  id: number;
  twitterName: string;
  points: number;
  relatedURL?: string;
  createdAt: number;
  updatedAt: number;
}

export const AdminUserManagement = () => {
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);
  
  // 编辑/创建模态框
  const { isOpen: isEditOpen, onOpen: onEditOpen, onOpenChange: onEditOpenChange } = useDisclosure();
  const [editingAdminUser, setEditingAdminUser] = useState<AdminUser | null>(null);
  const [adminUserForm, setAdminUserForm] = useState({
    address: '',
    name: '',
    status: 1,
    sign: '',
  });

  // 加载管理员用户列表
  const loadAdminUsers = async () => {
    try {
      setLoading(true);
      const response = await adminUserApi.getList(page, pageSize);
      if (response.code === '200') {
        setAdminUsers(response.list);
        setTotal(parseInt(response.total));
      }
    } catch (error) {
      console.error('加载管理员用户列表失败:', error);
      setMessage('加载管理员用户列表失败');
    } finally {
      setLoading(false);
    }
  };

  // 加载普通用户列表
  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await userApi.getList(page, pageSize);
      if (response.code === '200') {
        setUsers(response.list);
        setTotal(parseInt(response.total));
      }
    } catch (error) {
      console.error('加载用户列表失败:', error);
      setMessage('加载用户列表失败');
    } finally {
      setLoading(false);
    }
  };

  // 保存管理员用户
  const saveAdminUser = async () => {
    try {
      setLoading(true);
      const response = await adminUserApi.create(adminUserForm);
      
      if (response.code === '200') {
        setMessage('管理员用户创建成功');
        onEditOpenChange();
        resetForm();
        loadAdminUsers();
      } else {
        setMessage(response.msg || '操作失败');
      }
    } catch (error) {
      console.error('保存管理员用户失败:', error);
      setMessage('保存管理员用户失败');
    } finally {
      setLoading(false);
    }
  };

  // 更新管理员用户状态
  const updateAdminUserStatus = async (id: number, status: number) => {
    try {
      setLoading(true);
      const response = await adminUserApi.updateStatus(id, status);
      if (response.code === '200') {
        setMessage('管理员用户状态更新成功');
        loadAdminUsers();
      } else {
        setMessage(response.msg || '更新失败');
      }
    } catch (error) {
      console.error('更新管理员用户状态失败:', error);
      setMessage('更新管理员用户状态失败');
    } finally {
      setLoading(false);
    }
  };

  // 删除管理员用户
  const deleteAdminUser = async (id: number) => {
    if (!confirm('确定要删除这个管理员用户吗？')) return;
    
    try {
      setLoading(true);
      const response = await adminUserApi.delete(id);
      if (response.code === '200') {
        setMessage('管理员用户删除成功');
        loadAdminUsers();
      } else {
        setMessage(response.msg || '删除失败');
      }
    } catch (error) {
      console.error('删除管理员用户失败:', error);
      setMessage('删除管理员用户失败');
    } finally {
      setLoading(false);
    }
  };

  // 重置表单
  const resetForm = () => {
    setAdminUserForm({
      address: '',
      name: '',
      status: 1,
      sign: '',
    });
    setEditingAdminUser(null);
  };

  // 打开编辑模态框
  const openEditModal = (adminUser?: AdminUser) => {
    if (adminUser) {
      setEditingAdminUser(adminUser);
      setAdminUserForm({
        address: adminUser.address,
        name: adminUser.name,
        status: adminUser.status,
        sign: '', // 签名需要重新输入
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

  // 格式化地址（显示前6位和后4位）
  const formatAddress = (address: string) => {
    if (address.length <= 10) return address;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  useEffect(() => {
    loadAdminUsers();
  }, [page]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">管理员用户管理</h3>
          <Button color="primary" onPress={() => openEditModal()}>
            创建管理员用户
          </Button>
        </CardHeader>
        <CardBody>
          {/* 管理员用户列表 */}
          <Table aria-label="管理员用户列表">
            <TableHeader>
              <TableColumn>ID</TableColumn>
              <TableColumn>地址</TableColumn>
              <TableColumn>姓名</TableColumn>
              <TableColumn>状态</TableColumn>
              <TableColumn>创建时间</TableColumn>
              <TableColumn>更新时间</TableColumn>
              <TableColumn>操作</TableColumn>
            </TableHeader>
            <TableBody>
              {adminUsers.map((adminUser) => (
                <TableRow key={adminUser.id}>
                  <TableCell>{adminUser.id}</TableCell>
                  <TableCell className="font-mono text-sm">
                    {formatAddress(adminUser.address)}
                  </TableCell>
                  <TableCell>{adminUser.name}</TableCell>
                  <TableCell>
                    <Chip
                      color={adminUser.status === 1 ? 'success' : 'danger'}
                      variant="flat"
                    >
                      {adminUser.status === 1 ? '启用' : '禁用'}
                    </Chip>
                  </TableCell>
                  <TableCell>{formatTime(adminUser.createdAt)}</TableCell>
                  <TableCell>{formatTime(adminUser.updatedAt)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        color={adminUser.status === 1 ? 'danger' : 'success'}
                        variant="flat"
                        onClick={() => updateAdminUserStatus(adminUser.id, adminUser.status === 1 ? 0 : 1)}
                        isLoading={loading}
                      >
                        {adminUser.status === 1 ? '禁用' : '启用'}
                      </Button>
                      <Button
                        size="sm"
                        color="danger"
                        variant="flat"
                        onClick={() => deleteAdminUser(adminUser.id)}
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

      {/* 创建管理员用户模态框 */}
      <Modal isOpen={isEditOpen} onOpenChange={onEditOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                创建管理员用户
              </ModalHeader>
              <ModalBody className="space-y-4">
                <Input
                  label="钱包地址"
                  placeholder="请输入钱包地址"
                  value={adminUserForm.address}
                  onChange={(e) => setAdminUserForm(prev => ({ ...prev, address: e.target.value }))}
                />
                
                <Input
                  label="姓名"
                  placeholder="请输入管理员姓名"
                  value={adminUserForm.name}
                  onChange={(e) => setAdminUserForm(prev => ({ ...prev, name: e.target.value }))}
                />

                <div className="space-y-2">
                  <label className="text-sm font-medium">状态</label>
                  <div className="flex gap-2">
                    <Chip
                      color={adminUserForm.status === 1 ? 'success' : 'danger'}
                      variant="flat"
                    >
                      {adminUserForm.status === 1 ? '启用' : '禁用'}
                    </Chip>
                    <Button
                      size="sm"
                      color={adminUserForm.status === 1 ? 'danger' : 'success'}
                      variant="flat"
                      onClick={() => setAdminUserForm(prev => ({ 
                        ...prev, 
                        status: prev.status === 1 ? 0 : 1 
                      }))}
                    >
                      {adminUserForm.status === 1 ? '禁用' : '启用'}
                    </Button>
                  </div>
                </div>

                <Input
                  label="签名"
                  placeholder="请输入签名（用于验证身份）"
                  value={adminUserForm.sign}
                  onChange={(e) => setAdminUserForm(prev => ({ ...prev, sign: e.target.value }))}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  取消
                </Button>
                <Button color="primary" onPress={saveAdminUser} isLoading={loading}>
                  创建
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
