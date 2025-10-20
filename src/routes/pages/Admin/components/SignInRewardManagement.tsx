import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { Button } from '@nextui-org/react';
import { Input } from '@nextui-org/react';
import { Textarea } from '@nextui-org/react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/react';
import { signInRewardApi, stampApi } from '@/routes/pages/Admin/adminApi';

interface SignInReward {
  id: number;
  description: string;
  requiredConsecutiveDays: number;
  rewardPoints: number;
  rewardStampId: number;
  createdAt: number;
  updatedAt: number;
}

interface Stamp {
  id: number;
  name: string;
  stampType: string;
  description: string;
  imgUrl: string;
  sorted: number;
  disabled: boolean;
}

export const SignInRewardManagement = () => {
  const [rewards, setRewards] = useState<SignInReward[]>([]);
  const [stamps, setStamps] = useState<Stamp[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);
  
  // 编辑/创建模态框
  const { isOpen: isEditOpen, onOpen: onEditOpen, onOpenChange: onEditOpenChange } = useDisclosure();
  const [editingReward, setEditingReward] = useState<SignInReward | null>(null);
  const [rewardForm, setRewardForm] = useState({
    description: '',
    requiredConsecutiveDays: 1,
    rewardPoints: 0,
    rewardStampId: 0,
  });

  // 加载签到奖励列表
  const loadRewards = async () => {
    try {
      setLoading(true);
      const response = await signInRewardApi.getList(page, pageSize);
      if (response.code === '200') {
        setRewards(response.list);
        setTotal(parseInt(response.total));
      }
    } catch (error) {
      console.error('加载签到奖励列表失败:', error);
      setMessage('加载签到奖励列表失败');
    } finally {
      setLoading(false);
    }
  };

  // 加载徽章列表（用于选择奖励徽章）
  const loadStamps = async () => {
    try {
      const response = await stampApi.getList(1, 100); // 获取所有徽章
      if (response.code === '200') {
        setStamps(response.list);
      }
    } catch (error) {
      console.error('加载徽章列表失败:', error);
    }
  };

  // 保存签到奖励
  const saveReward = async () => {
    try {
      setLoading(true);
      const response = editingReward
        ? await signInRewardApi.update(editingReward.id, rewardForm)
        : await signInRewardApi.create(rewardForm);
      
      if (response.code === '200') {
        setMessage(editingReward ? '签到奖励更新成功' : '签到奖励创建成功');
        onEditOpenChange();
        resetForm();
        loadRewards();
      } else {
        setMessage(response.msg || '操作失败');
      }
    } catch (error) {
      console.error('保存签到奖励失败:', error);
      setMessage('保存签到奖励失败');
    } finally {
      setLoading(false);
    }
  };

  // 删除签到奖励
  const deleteReward = async (id: number) => {
    if (!confirm('确定要删除这个签到奖励吗？')) return;
    
    try {
      setLoading(true);
      const response = await signInRewardApi.delete(id);
      if (response.code === '200') {
        setMessage('签到奖励删除成功');
        loadRewards();
      } else {
        setMessage(response.msg || '删除失败');
      }
    } catch (error) {
      console.error('删除签到奖励失败:', error);
      setMessage('删除签到奖励失败');
    } finally {
      setLoading(false);
    }
  };

  // 重置表单
  const resetForm = () => {
    setRewardForm({
      description: '',
      requiredConsecutiveDays: 1,
      rewardPoints: 0,
      rewardStampId: 0,
    });
    setEditingReward(null);
  };

  // 打开编辑模态框
  const openEditModal = (reward?: SignInReward) => {
    if (reward) {
      setEditingReward(reward);
      setRewardForm({
        description: reward.description,
        requiredConsecutiveDays: reward.requiredConsecutiveDays,
        rewardPoints: reward.rewardPoints,
        rewardStampId: reward.rewardStampId,
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

  // 获取徽章名称
  const getStampName = (stampId: number) => {
    const stamp = stamps.find(s => s.id === stampId);
    return stamp ? stamp.name : `徽章ID: ${stampId}`;
  };

  useEffect(() => {
    loadRewards();
    loadStamps();
  }, [page]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">签到奖励管理</h3>
          <Button color="primary" onPress={() => openEditModal()}>
            创建签到奖励
          </Button>
        </CardHeader>
        <CardBody>
          {/* 签到奖励列表 */}
          <Table aria-label="签到奖励列表">
            <TableHeader>
              <TableColumn>ID</TableColumn>
              <TableColumn>描述</TableColumn>
              <TableColumn>连续天数</TableColumn>
              <TableColumn>奖励积分</TableColumn>
              <TableColumn>奖励徽章</TableColumn>
              <TableColumn>创建时间</TableColumn>
              <TableColumn>操作</TableColumn>
            </TableHeader>
            <TableBody>
              {rewards.map((reward) => (
                <TableRow key={reward.id}>
                  <TableCell>{reward.id}</TableCell>
                  <TableCell className="max-w-xs truncate">{reward.description}</TableCell>
                  <TableCell>{reward.requiredConsecutiveDays} 天</TableCell>
                  <TableCell>{reward.rewardPoints}</TableCell>
                  <TableCell>{getStampName(reward.rewardStampId)}</TableCell>
                  <TableCell>{formatTime(reward.createdAt)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        color="primary"
                        variant="flat"
                        onClick={() => openEditModal(reward)}
                      >
                        编辑
                      </Button>
                      <Button
                        size="sm"
                        color="danger"
                        variant="flat"
                        onClick={() => deleteReward(reward.id)}
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

      {/* 编辑/创建签到奖励模态框 */}
      <Modal isOpen={isEditOpen} onOpenChange={onEditOpenChange} size="2xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {editingReward ? '编辑签到奖励' : '创建签到奖励'}
              </ModalHeader>
              <ModalBody className="space-y-4">
                <Textarea
                  label="奖励描述"
                  placeholder="请输入奖励描述"
                  value={rewardForm.description}
                  onChange={(e) => setRewardForm(prev => ({ ...prev, description: e.target.value }))}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    type="number"
                    label="连续签到天数"
                    placeholder="请输入连续签到天数"
                    value={rewardForm.requiredConsecutiveDays.toString()}
                    onChange={(e) => setRewardForm(prev => ({ 
                      ...prev, 
                      requiredConsecutiveDays: parseInt(e.target.value) || 1 
                    }))}
                    min={1}
                  />
                  <Input
                    type="number"
                    label="奖励积分"
                    placeholder="请输入奖励积分"
                    value={rewardForm.rewardPoints.toString()}
                    onChange={(e) => setRewardForm(prev => ({ 
                      ...prev, 
                      rewardPoints: parseInt(e.target.value) || 0 
                    }))}
                    min={0}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">奖励徽章</label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={rewardForm.rewardStampId}
                    onChange={(e) => setRewardForm(prev => ({ 
                      ...prev, 
                      rewardStampId: parseInt(e.target.value) || 0 
                    }))}
                  >
                    <option value={0}>请选择徽章</option>
                    {stamps.map((stamp) => (
                      <option key={stamp.id} value={stamp.id}>
                        {stamp.name} ({stamp.stampType})
                      </option>
                    ))}
                  </select>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  取消
                </Button>
                <Button color="primary" onPress={saveReward} isLoading={loading}>
                  {editingReward ? '更新' : '创建'}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
