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
import { Tabs, Tab } from '@nextui-org/react';
import { taskApi, stampApi, uploadApi } from '@/routes/pages/Admin/adminApi';

interface TaskGroup {
  id: number;
  title: string;
  description: string;
  imgUrl: string;
  startAt: number;
  endAt: number;
  taskList: Task[];
  createdAt: number;
  updatedAt: number;
}

interface Task {
  id: number;
  title: string;
  description: string;
  imgUrl: string;
  taskType: string;
  RewardPoints: number;
  RewardStampId: number;
  startAt: number;
  endAt: number;
  forceLocked: boolean;
  inviteTaskConfig?: { requestInviteNum: number };
  postTwitterTaskConfig?: { content: string };
  quizTaskConfig?: { quiz: string; answer: string };
  createdAt: number;
  updatedAt: number;
}

interface PendingTask {
  id: number;
  userId: number;
  taskId: number;
  taskTitle: string;
  taskResult: string;
  status: number;
  createdAt: number;
  updatedAt: number;
}

const TASK_TYPES = [
  { key: 'invite', label: '邀请任务' },
  { key: 'postTwitter', label: 'Twitter发帖任务' },
  { key: 'quiz', label: '问答任务' },
  { key: 'signIn', label: '签到任务' },
];

export const TaskManagement = () => {
  const [taskGroups, setTaskGroups] = useState<TaskGroup[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [pendingTasks, setPendingTasks] = useState<PendingTask[]>([]);
  const [stamps, setStamps] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  
  // 编辑/创建模态框
  const { isOpen: isEditOpen, onOpen: onEditOpen, onOpenChange: onEditOpenChange } = useDisclosure();
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [taskForm, setTaskForm] = useState({
    groupId: 0,
    title: '',
    description: '',
    imgUrl: '',
    taskType: '',
    RewardPoints: 0,
    RewardStampId: 0,
    startAt: 0,
    endAt: 0,
    forceLocked: false,
    inviteTaskConfig: { requestInviteNum: 1 },
    postTwitterTaskConfig: { content: '' },
    quizTaskConfig: { quiz: '', answer: '' },
  });
  const [uploading, setUploading] = useState(false);

  // 加载任务组列表
  const loadTaskGroups = async () => {
    try {
      setLoading(true);
      const response = await taskApi.getTaskGroupList(page, pageSize);
      if (response.code === '200') {
        setTaskGroups(response.list);
        setTotal(parseInt(response.total));
      }
    } catch (error) {
      console.error('加载任务组列表失败:', error);
      setMessage('加载任务组列表失败');
    } finally {
      setLoading(false);
    }
  };

  // 加载任务列表
  const loadTasks = async (groupId: number) => {
    try {
      setLoading(true);
      const response = await taskApi.getTaskList(groupId, page, pageSize);
      if (response.code === '200') {
        setTasks(response.list);
        setTotal(parseInt(response.total));
      }
    } catch (error) {
      console.error('加载任务列表失败:', error);
      setMessage('加载任务列表失败');
    } finally {
      setLoading(false);
    }
  };

  // 加载待审核任务
  const loadPendingTasks = async () => {
    try {
      setLoading(true);
      const response = await taskApi.getPendingPostTwitterTasks(page, pageSize);
      if (response.code === '200') {
        setPendingTasks(response.list);
        setTotal(parseInt(response.total));
      }
    } catch (error) {
      console.error('加载待审核任务失败:', error);
      setMessage('加载待审核任务失败');
    } finally {
      setLoading(false);
    }
  };

  // 加载徽章列表
  const loadStamps = async () => {
    try {
      const response = await stampApi.getList(1, 100);
      if (response.code === '200') {
        setStamps(response.list);
      }
    } catch (error) {
      console.error('加载徽章列表失败:', error);
    }
  };

  // 文件上传
  const handleFileUpload = async (file: File) => {
    try {
      setUploading(true);
      const response = await uploadApi.upload(file);
      if (response.code === '200') {
        setTaskForm(prev => ({ ...prev, imgUrl: response.fileUrl }));
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

  // 保存任务
  const saveTask = async () => {
    try {
      setLoading(true);
      const response = editingTask
        ? await taskApi.updateTask({ ...taskForm, id: editingTask.id })
        : await taskApi.createTask(taskForm);
      
      if (response.code === '200') {
        setMessage(editingTask ? '任务更新成功' : '任务创建成功');
        onEditOpenChange();
        resetForm();
        if (selectedGroupId) {
          loadTasks(selectedGroupId);
        }
      } else {
        setMessage(response.msg || '操作失败');
      }
    } catch (error) {
      console.error('保存任务失败:', error);
      setMessage('保存任务失败');
    } finally {
      setLoading(false);
    }
  };

  // 删除任务
  const deleteTask = async (id: number) => {
    if (!confirm('确定要删除这个任务吗？')) return;
    
    try {
      setLoading(true);
      const response = await taskApi.deleteTask(id);
      if (response.code === '200') {
        setMessage('任务删除成功');
        if (selectedGroupId) {
          loadTasks(selectedGroupId);
        }
      } else {
        setMessage(response.msg || '删除失败');
      }
    } catch (error) {
      console.error('删除任务失败:', error);
      setMessage('删除任务失败');
    } finally {
      setLoading(false);
    }
  };

  // 审核任务
  const approveTask = async (id: number) => {
    try {
      setLoading(true);
      const response = await taskApi.approveTask(id);
      if (response.code === '200') {
        setMessage('任务审核成功');
        loadPendingTasks();
      } else {
        setMessage(response.msg || '审核失败');
      }
    } catch (error) {
      console.error('审核任务失败:', error);
      setMessage('审核任务失败');
    } finally {
      setLoading(false);
    }
  };

  // 重置表单
  const resetForm = () => {
    setTaskForm({
      groupId: selectedGroupId || 0,
      title: '',
      description: '',
      imgUrl: '',
      taskType: '',
      RewardPoints: 0,
      RewardStampId: 0,
      startAt: 0,
      endAt: 0,
      forceLocked: false,
      inviteTaskConfig: { requestInviteNum: 1 },
      postTwitterTaskConfig: { content: '' },
      quizTaskConfig: { quiz: '', answer: '' },
    });
    setEditingTask(null);
  };

  // 打开编辑模态框
  const openEditModal = (task?: Task) => {
    if (task) {
      setEditingTask(task);
      setTaskForm({
        groupId: task.groupId || selectedGroupId || 0,
        title: task.title,
        description: task.description,
        imgUrl: task.imgUrl,
        taskType: task.taskType,
        RewardPoints: task.RewardPoints,
        RewardStampId: task.RewardStampId,
        startAt: task.startAt,
        endAt: task.endAt,
        forceLocked: task.forceLocked,
        inviteTaskConfig: task.inviteTaskConfig || { requestInviteNum: 1 },
        postTwitterTaskConfig: task.postTwitterTaskConfig || { content: '' },
        quizTaskConfig: task.quizTaskConfig || { quiz: '', answer: '' },
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
    loadTaskGroups();
    loadStamps();
  }, [page]);

  useEffect(() => {
    if (selectedGroupId) {
      loadTasks(selectedGroupId);
    }
  }, [selectedGroupId, page]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">任务管理</h3>
        </CardHeader>
        <CardBody>
          <Tabs aria-label="任务管理">
            <Tab key="taskGroups" title="任务组管理">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">任务组列表</h4>
                  <Button color="primary" size="sm">
                    创建任务组
                  </Button>
                </div>
                
                <Table aria-label="任务组列表">
                  <TableHeader>
                    <TableColumn>ID</TableColumn>
                    <TableColumn>标题</TableColumn>
                    <TableColumn>描述</TableColumn>
                    <TableColumn>开始时间</TableColumn>
                    <TableColumn>结束时间</TableColumn>
                    <TableColumn>任务数量</TableColumn>
                    <TableColumn>操作</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {taskGroups.map((group) => (
                      <TableRow key={group.id}>
                        <TableCell>{group.id}</TableCell>
                        <TableCell>{group.title}</TableCell>
                        <TableCell className="max-w-xs truncate">{group.description}</TableCell>
                        <TableCell>{formatTime(group.startAt)}</TableCell>
                        <TableCell>{formatTime(group.endAt)}</TableCell>
                        <TableCell>{group.taskList?.length || 0}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              color="primary"
                              variant="flat"
                              onClick={() => setSelectedGroupId(group.id)}
                            >
                              查看任务
                            </Button>
                            <Button
                              size="sm"
                              color="warning"
                              variant="flat"
                            >
                              编辑
                            </Button>
                            <Button
                              size="sm"
                              color="danger"
                              variant="flat"
                            >
                              删除
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Tab>

            <Tab key="tasks" title="任务管理">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">
                    任务列表 {selectedGroupId && `(组ID: ${selectedGroupId})`}
                  </h4>
                  <Button 
                    color="primary" 
                    size="sm"
                    onPress={() => openEditModal()}
                    isDisabled={!selectedGroupId}
                  >
                    创建任务
                  </Button>
                </div>

                {selectedGroupId ? (
                  <Table aria-label="任务列表">
                    <TableHeader>
                      <TableColumn>ID</TableColumn>
                      <TableColumn>标题</TableColumn>
                      <TableColumn>类型</TableColumn>
                      <TableColumn>奖励积分</TableColumn>
                      <TableColumn>奖励徽章</TableColumn>
                      <TableColumn>强制锁定</TableColumn>
                      <TableColumn>操作</TableColumn>
                    </TableHeader>
                    <TableBody>
                      {tasks.map((task) => (
                        <TableRow key={task.id}>
                          <TableCell>{task.id}</TableCell>
                          <TableCell>{task.title}</TableCell>
                          <TableCell>
                            {TASK_TYPES.find(type => type.key === task.taskType)?.label || task.taskType}
                          </TableCell>
                          <TableCell>{task.RewardPoints}</TableCell>
                          <TableCell>{getStampName(task.RewardStampId)}</TableCell>
                          <TableCell>
                            <Chip
                              color={task.forceLocked ? 'warning' : 'default'}
                              variant="flat"
                            >
                              {task.forceLocked ? '锁定' : '正常'}
                            </Chip>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                color="primary"
                                variant="flat"
                                onClick={() => openEditModal(task)}
                              >
                                编辑
                              </Button>
                              <Button
                                size="sm"
                                color="danger"
                                variant="flat"
                                onClick={() => deleteTask(task.id)}
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
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    请先选择一个任务组查看任务
                  </div>
                )}
              </div>
            </Tab>

            <Tab key="pending" title="待审核任务">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">待审核的Twitter发帖任务</h4>
                </div>

                <Table aria-label="待审核任务列表">
                  <TableHeader>
                    <TableColumn>ID</TableColumn>
                    <TableColumn>用户ID</TableColumn>
                    <TableColumn>任务标题</TableColumn>
                    <TableColumn>提交内容</TableColumn>
                    <TableColumn>状态</TableColumn>
                    <TableColumn>提交时间</TableColumn>
                    <TableColumn>操作</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {pendingTasks.map((task) => (
                      <TableRow key={task.id}>
                        <TableCell>{task.id}</TableCell>
                        <TableCell>{task.userId}</TableCell>
                        <TableCell>{task.taskTitle}</TableCell>
                        <TableCell className="max-w-xs truncate">{task.taskResult}</TableCell>
                        <TableCell>
                          <Chip
                            color={task.status === 1 ? 'warning' : 'success'}
                            variant="flat"
                          >
                            {task.status === 1 ? '待审核' : '已完成'}
                          </Chip>
                        </TableCell>
                        <TableCell>{formatTime(task.createdAt)}</TableCell>
                        <TableCell>
                          {task.status === 1 && (
                            <Button
                              size="sm"
                              color="success"
                              variant="flat"
                              onClick={() => approveTask(task.id)}
                              isLoading={loading}
                            >
                              审核通过
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Tab>
          </Tabs>

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

      {/* 编辑/创建任务模态框 */}
      <Modal isOpen={isEditOpen} onOpenChange={onEditOpenChange} size="4xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {editingTask ? '编辑任务' : '创建任务'}
              </ModalHeader>
              <ModalBody className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="任务标题"
                    placeholder="请输入任务标题"
                    value={taskForm.title}
                    onChange={(e) => setTaskForm(prev => ({ ...prev, title: e.target.value }))}
                  />
                  <Select
                    label="任务类型"
                    placeholder="请选择任务类型"
                    selectedKeys={taskForm.taskType ? [taskForm.taskType] : []}
                    onSelectionChange={(keys) => {
                      const selected = Array.from(keys)[0] as string;
                      setTaskForm(prev => ({ ...prev, taskType: selected }));
                    }}
                  >
                    {TASK_TYPES.map((type) => (
                      <SelectItem key={type.key} value={type.key}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </Select>
                </div>

                <Textarea
                  label="任务描述"
                  placeholder="请输入任务描述"
                  value={taskForm.description}
                  onChange={(e) => setTaskForm(prev => ({ ...prev, description: e.target.value }))}
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    type="number"
                    label="奖励积分"
                    placeholder="请输入奖励积分"
                    value={taskForm.RewardPoints.toString()}
                    onChange={(e) => setTaskForm(prev => ({ 
                      ...prev, 
                      RewardPoints: parseInt(e.target.value) || 0 
                    }))}
                  />
                  <div className="space-y-2">
                    <label className="text-sm font-medium">奖励徽章</label>
                    <select
                      className="w-full p-2 border rounded-md"
                      value={taskForm.RewardStampId}
                      onChange={(e) => setTaskForm(prev => ({ 
                        ...prev, 
                        RewardStampId: parseInt(e.target.value) || 0 
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
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    type="datetime-local"
                    label="开始时间"
                    value={taskForm.startAt ? new Date(taskForm.startAt * 1000).toISOString().slice(0, 16) : ''}
                    onChange={(e) => setTaskForm(prev => ({ 
                      ...prev, 
                      startAt: e.target.value ? Math.floor(new Date(e.target.value).getTime() / 1000) : 0 
                    }))}
                  />
                  <Input
                    type="datetime-local"
                    label="结束时间"
                    value={taskForm.endAt ? new Date(taskForm.endAt * 1000).toISOString().slice(0, 16) : ''}
                    onChange={(e) => setTaskForm(prev => ({ 
                      ...prev, 
                      endAt: e.target.value ? Math.floor(new Date(e.target.value).getTime() / 1000) : 0 
                    }))}
                  />
                </div>

                {/* 任务类型特定配置 */}
                {taskForm.taskType === 'invite' && (
                  <Input
                    type="number"
                    label="邀请人数要求"
                    placeholder="请输入邀请人数要求"
                    value={taskForm.inviteTaskConfig.requestInviteNum.toString()}
                    onChange={(e) => setTaskForm(prev => ({ 
                      ...prev, 
                      inviteTaskConfig: { 
                        ...prev.inviteTaskConfig, 
                        requestInviteNum: parseInt(e.target.value) || 1 
                      }
                    }))}
                  />
                )}

                {taskForm.taskType === 'postTwitter' && (
                  <Textarea
                    label="Twitter发帖内容要求"
                    placeholder="请输入Twitter发帖内容要求"
                    value={taskForm.postTwitterTaskConfig.content}
                    onChange={(e) => setTaskForm(prev => ({ 
                      ...prev, 
                      postTwitterTaskConfig: { 
                        ...prev.postTwitterTaskConfig, 
                        content: e.target.value 
                      }
                    }))}
                  />
                )}

                {taskForm.taskType === 'quiz' && (
                  <div className="space-y-4">
                    <Textarea
                      label="问题"
                      placeholder="请输入问题"
                      value={taskForm.quizTaskConfig.quiz}
                      onChange={(e) => setTaskForm(prev => ({ 
                        ...prev, 
                        quizTaskConfig: { 
                          ...prev.quizTaskConfig, 
                          quiz: e.target.value 
                        }
                      }))}
                    />
                    <Input
                      label="答案"
                      placeholder="请输入答案"
                      value={taskForm.quizTaskConfig.answer}
                      onChange={(e) => setTaskForm(prev => ({ 
                        ...prev, 
                        quizTaskConfig: { 
                          ...prev.quizTaskConfig, 
                          answer: e.target.value 
                        }
                      }))}
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium">任务图片</label>
                  <div className="flex gap-4 items-center">
                    {taskForm.imgUrl && (
                      <Image
                        src={taskForm.imgUrl}
                        alt="任务预览"
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
                      id="task-image-upload"
                    />
                    <Button
                      as="label"
                      htmlFor="task-image-upload"
                      color="primary"
                      variant="flat"
                      isLoading={uploading}
                    >
                      上传图片
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-sm">强制锁定:</label>
                  <Chip
                    color={taskForm.forceLocked ? 'warning' : 'default'}
                    variant="flat"
                  >
                    {taskForm.forceLocked ? '锁定' : '正常'}
                  </Chip>
                  <Button
                    size="sm"
                    color={taskForm.forceLocked ? 'default' : 'warning'}
                    variant="flat"
                    onClick={() => setTaskForm(prev => ({ ...prev, forceLocked: !prev.forceLocked }))}
                  >
                    {taskForm.forceLocked ? '取消锁定' : '锁定任务'}
                  </Button>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  取消
                </Button>
                <Button color="primary" onPress={saveTask} isLoading={loading}>
                  {editingTask ? '更新' : '创建'}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
