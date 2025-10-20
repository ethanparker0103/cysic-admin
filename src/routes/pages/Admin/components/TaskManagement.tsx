import { useState, useEffect, useCallback } from 'react';
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
  groupId?: number;
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

interface Stamp {
  id: number;
  name: string;
  stampType: string;
  description: string;
  imgUrl: string;
  sorted: number;
  disabled: boolean;
}

const TASK_TYPES = [
  { key: 'invite', label: 'Invite Task' },
  { key: 'postTwitter', label: 'Twitter Post Task' },
  { key: 'quiz', label: 'Quiz Task' },
  { key: 'signIn', label: 'Sign-in Task' },
];

export const TaskManagement = () => {
  const [taskGroups, setTaskGroups] = useState<TaskGroup[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [pendingTasks, setPendingTasks] = useState<PendingTask[]>([]);
  const [stamps, setStamps] = useState<Stamp[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  
  // Edit/Create task modal
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

  // Edit/Create task group modal
  const { isOpen: isGroupEditOpen, onOpen: onGroupEditOpen, onOpenChange: onGroupEditOpenChange } = useDisclosure();
  const [editingTaskGroup, setEditingTaskGroup] = useState<TaskGroup | null>(null);
  const [taskGroupForm, setTaskGroupForm] = useState({
    title: '',
    description: '',
    imgUrl: '',
    startAt: 0,
    endAt: 0,
  });
  const [groupUploading, setGroupUploading] = useState(false);

  // Load task group list
  const loadTaskGroups = useCallback(async () => {
    try {
      setLoading(true);
      const response = await taskApi.getTaskGroupList(page, pageSize);
      if (response.code === '200') {
        setTaskGroups(response.list as TaskGroup[]);
        setTotal(parseInt(response.total));
      }
    } catch (error) {
      console.error('Failed to load task group list:', error);
      setMessage('Failed to load task group list');
    } finally {
      setLoading(false);
    }
  }, [page, pageSize]);

  // Load task list
  const loadTasks = useCallback(async (groupId: number) => {
    try {
      setLoading(true);
      const response = await taskApi.getTaskList(groupId, page, pageSize);
      if (response.code === '200') {
        setTasks(response.list as Task[]);
        setTotal(parseInt(response.total));
      }
    } catch (error) {
      console.error('Failed to load task list:', error);
      setMessage('Failed to load task list');
    } finally {
      setLoading(false);
    }
  }, [page, pageSize]);

  // Load pending tasks
  const loadPendingTasks = async () => {
    try {
      setLoading(true);
      const response = await taskApi.getPendingPostTwitterTasks(page, pageSize);
      if (response.code === '200') {
        setPendingTasks(response.list as PendingTask[]);
        setTotal(parseInt(response.total));
      }
    } catch (error) {
      console.error('Failed to load pending tasks:', error);
      setMessage('Failed to load pending tasks');
    } finally {
      setLoading(false);
    }
  };

  // Load stamp list
  const loadStamps = async () => {
    try {
      const response = await stampApi.getList(1, 100);
      if (response.code === '200') {
        setStamps(response.list as Stamp[]);
      }
    } catch (error) {
      console.error('Failed to load stamp list:', error);
    }
  };

  // File upload
  const handleFileUpload = async (file: File) => {
    try {
      setUploading(true);
      const response = await uploadApi.upload(file);
      if (response.code === '200') {
        setTaskForm(prev => ({ ...prev, imgUrl: response.fileUrl }));
        setMessage('Image uploaded successfully');
      } else {
        setMessage('Image upload failed');
      }
    } catch (error) {
      console.error('Image upload failed:', error);
      setMessage('Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  // File upload for task group
  const handleGroupFileUpload = async (file: File) => {
    try {
      setGroupUploading(true);
      const response = await uploadApi.upload(file);
      if (response.code === '200') {
        setTaskGroupForm(prev => ({ ...prev, imgUrl: response.fileUrl }));
        setMessage('Image uploaded successfully');
      } else {
        setMessage('Image upload failed');
      }
    } catch (error) {
      console.error('Image upload failed:', error);
      setMessage('Image upload failed');
    } finally {
      setGroupUploading(false);
    }
  };

  // Save task
  const saveTask = async () => {
    try {
      setLoading(true);
      const response = editingTask
        ? await taskApi.updateTask({ ...taskForm, id: editingTask.id })
        : await taskApi.createTask(taskForm);
      
      if (response.code === '200') {
        setMessage(editingTask ? 'Task updated successfully' : 'Task created successfully');
        onEditOpenChange();
        resetForm();
        if (selectedGroupId) {
          loadTasks(selectedGroupId);
        }
      } else {
        setMessage(response.msg || 'Operation failed');
      }
    } catch (error) {
      console.error('Failed to save task:', error);
      setMessage('Failed to save task');
    } finally {
      setLoading(false);
    }
  };

  // Delete task
  const deleteTask = async (id: number) => {
    if (!confirm('Are you sure you want to delete this task?')) return;
    
    try {
      setLoading(true);
      const response = await taskApi.deleteTask(id);
      if (response.code === '200') {
        setMessage('Task deleted successfully');
        if (selectedGroupId) {
          loadTasks(selectedGroupId);
        }
      } else {
        setMessage(response.msg || 'Delete failed');
      }
    } catch (error) {
      console.error('Failed to delete task:', error);
      setMessage('Failed to delete task');
    } finally {
      setLoading(false);
    }
  };

  // Approve task
  const approveTask = async (id: number) => {
    try {
      setLoading(true);
      const response = await taskApi.approveTask(id);
      if (response.code === '200') {
        setMessage('Task approved successfully');
        loadPendingTasks();
      } else {
        setMessage(response.msg || 'Approval failed');
      }
    } catch (error) {
      console.error('Failed to approve task:', error);
      setMessage('Failed to approve task');
    } finally {
      setLoading(false);
    }
  };

  // Save task group
  const saveTaskGroup = async () => {
    try {
      setLoading(true);
      const response = editingTaskGroup
        ? await taskApi.updateTaskGroup(editingTaskGroup.id, taskGroupForm)
        : await taskApi.createTaskGroup(taskGroupForm);
      
      if (response.code === '200') {
        setMessage(editingTaskGroup ? 'Task group updated successfully' : 'Task group created successfully');
        onGroupEditOpenChange();
        resetGroupForm();
        loadTaskGroups();
      } else {
        setMessage(response.msg || 'Operation failed');
      }
    } catch (error) {
      console.error('Failed to save task group:', error);
      setMessage('Failed to save task group');
    } finally {
      setLoading(false);
    }
  };

  // Delete task group
  const deleteTaskGroup = async (id: number) => {
    if (!confirm('Are you sure you want to delete this task group?')) return;
    
    try {
      setLoading(true);
      const response = await taskApi.deleteTaskGroup(id);
      if (response.code === '200') {
        setMessage('Task group deleted successfully');
        loadTaskGroups();
      } else {
        setMessage(response.msg || 'Delete failed');
      }
    } catch (error) {
      console.error('Failed to delete task group:', error);
      setMessage('Failed to delete task group');
    } finally {
      setLoading(false);
    }
  };

  // Reset task group form
  const resetGroupForm = () => {
    setTaskGroupForm({
      title: '',
      description: '',
      imgUrl: '',
      startAt: 0,
      endAt: 0,
    });
    setEditingTaskGroup(null);
  };

  // Open task group edit modal
  const openGroupEditModal = (taskGroup?: TaskGroup) => {
    if (taskGroup) {
      setEditingTaskGroup(taskGroup);
      setTaskGroupForm({
        title: taskGroup.title,
        description: taskGroup.description,
        imgUrl: taskGroup.imgUrl,
        startAt: taskGroup.startAt,
        endAt: taskGroup.endAt,
      });
    } else {
      resetGroupForm();
    }
    onGroupEditOpen();
  };

  // Reset form
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

  // Open edit modal
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

  // Format time
  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString('en-US');
  };

  // Get stamp name
  const getStampName = (stampId: number) => {
    const stamp = stamps.find(s => s.id === stampId);
    return stamp ? stamp.name : `Stamp ID: ${stampId}`;
  };

  useEffect(() => {
    loadTaskGroups();
    loadStamps();
  }, [loadTaskGroups]);

  useEffect(() => {
    if (selectedGroupId) {
      loadTasks(selectedGroupId);
    }
  }, [selectedGroupId, loadTasks]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Task Management</h3>
        </CardHeader>
        <CardBody>
          <Tabs aria-label="Task Management">
            <Tab key="taskGroups" title="Task Group Management">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Task Group List</h4>
                  <Button color="primary" size="sm" onPress={() => openGroupEditModal()}>
                    Create Task Group
                  </Button>
                </div>
                
                <Table aria-label="Task Group List">
                  <TableHeader>
                    <TableColumn>ID</TableColumn>
                    <TableColumn>Title</TableColumn>
                    <TableColumn>Description</TableColumn>
                    <TableColumn>Start Time</TableColumn>
                    <TableColumn>End Time</TableColumn>
                    <TableColumn>Task Count</TableColumn>
                    <TableColumn>Actions</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {taskGroups?.map((group) => (
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
                              View Tasks
                            </Button>
                            <Button
                              size="sm"
                              color="warning"
                              variant="flat"
                              onClick={() => openGroupEditModal(group)}
                            >
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              color="danger"
                              variant="flat"
                              onClick={() => deleteTaskGroup(group.id)}
                              isLoading={loading}
                            >
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Tab>

            <Tab key="tasks" title="Task Management">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">
                    Task List {selectedGroupId && `(Group ID: ${selectedGroupId})`}
                  </h4>
                  <Button 
                    color="primary" 
                    size="sm"
                    onPress={() => openEditModal()}
                    isDisabled={!selectedGroupId}
                  >
                    Create Task
                  </Button>
                </div>

                {selectedGroupId ? (
                  <Table aria-label="Task List">
                    <TableHeader>
                      <TableColumn>ID</TableColumn>
                      <TableColumn>Title</TableColumn>
                      <TableColumn>Type</TableColumn>
                      <TableColumn>Reward Points</TableColumn>
                      <TableColumn>Reward Stamp</TableColumn>
                      <TableColumn>Force Locked</TableColumn>
                      <TableColumn>Actions</TableColumn>
                    </TableHeader>
                    <TableBody>
                      {tasks?.map((task) => (
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
                              {task.forceLocked ? 'Locked' : 'Normal'}
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
                                Edit
                              </Button>
                              <Button
                                size="sm"
                                color="danger"
                                variant="flat"
                                onClick={() => deleteTask(task.id)}
                                isLoading={loading}
                              >
                                Delete
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    Please select a task group first to view tasks
                  </div>
                )}
              </div>
            </Tab>

            <Tab key="pending" title="Pending Tasks">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Pending Twitter Post Tasks</h4>
                </div>

                <Table aria-label="Pending Task List">
                  <TableHeader>
                    <TableColumn>ID</TableColumn>
                    <TableColumn>User ID</TableColumn>
                    <TableColumn>Task Title</TableColumn>
                    <TableColumn>Submitted Content</TableColumn>
                    <TableColumn>Status</TableColumn>
                    <TableColumn>Submitted At</TableColumn>
                    <TableColumn>Actions</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {pendingTasks?.map((task) => (
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
                            {task.status === 1 ? 'Pending' : 'Completed'}
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
                              Approve
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

          {/* Pagination */}
          <div className="flex justify-center mt-4">
            <Button
              isDisabled={page === 1}
              onClick={() => setPage(page - 1)}
              variant="flat"
            >
              Previous
            </Button>
            <span className="mx-4 flex items-center">
              Page {page} of {Math.ceil(total / pageSize)}
            </span>
            <Button
              isDisabled={page >= Math.ceil(total / pageSize)}
              onClick={() => setPage(page + 1)}
              variant="flat"
            >
              Next
            </Button>
          </div>

          {/* Message Display */}
          {message && (
            <div className={`mt-4 p-3 rounded-md ${
              message.includes('successful') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            }`}>
              {message}
            </div>
          )}
        </CardBody>
      </Card>

      {/* Edit/Create Task Modal */}
      <Modal isOpen={isEditOpen} onOpenChange={onEditOpenChange} size="4xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {editingTask ? 'Edit Task' : 'Create Task'}
              </ModalHeader>
              <ModalBody className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Task Title"
                    placeholder="Enter task title"
                    value={taskForm.title}
                    onChange={(e) => setTaskForm(prev => ({ ...prev, title: e.target.value }))}
                  />
                  <Select
                    label="Task Type"
                    placeholder="Select task type"
                    selectedKeys={taskForm.taskType ? [taskForm.taskType] : []}
                    onSelectionChange={(keys) => {
                      const selected = Array.from(keys)[0] as string;
                      setTaskForm(prev => ({ ...prev, taskType: selected }));
                    }}
                  >
                    {TASK_TYPES?.map((type) => (
                      <SelectItem key={type.key} value={type.key}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </Select>
                </div>

                <Textarea
                  label="Task Description"
                  placeholder="Enter task description"
                  value={taskForm.description}
                  onChange={(e) => setTaskForm(prev => ({ ...prev, description: e.target.value }))}
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    type="number"
                    label="Reward Points"
                    placeholder="Enter reward points"
                    value={taskForm.RewardPoints.toString()}
                    onChange={(e) => setTaskForm(prev => ({ 
                      ...prev, 
                      RewardPoints: parseInt(e.target.value) || 0 
                    }))}
                  />
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Reward Stamp</label>
                    <select
                      className="w-full p-2 border rounded-md"
                      value={taskForm.RewardStampId}
                      onChange={(e) => setTaskForm(prev => ({ 
                        ...prev, 
                        RewardStampId: parseInt(e.target.value) || 0 
                      }))}
                    >
                      <option value={0}>Select Stamp</option>
                      {stamps?.map((stamp) => (
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
                    label="Start Time"
                    value={taskForm.startAt ? new Date(taskForm.startAt * 1000).toISOString().slice(0, 16) : ''}
                    onChange={(e) => setTaskForm(prev => ({ 
                      ...prev, 
                      startAt: e.target.value ? Math.floor(new Date(e.target.value).getTime() / 1000) : 0 
                    }))}
                  />
                  <Input
                    type="datetime-local"
                    label="End Time"
                    value={taskForm.endAt ? new Date(taskForm.endAt * 1000).toISOString().slice(0, 16) : ''}
                    onChange={(e) => setTaskForm(prev => ({ 
                      ...prev, 
                      endAt: e.target.value ? Math.floor(new Date(e.target.value).getTime() / 1000) : 0 
                    }))}
                  />
                </div>

                {/* Task type specific configuration */}
                {taskForm.taskType === 'invite' && (
                  <Input
                    type="number"
                    label="Required Invite Count"
                    placeholder="Enter required invite count"
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
                    label="Twitter Post Content Requirement"
                    placeholder="Enter Twitter post content requirement"
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
                      label="Question"
                      placeholder="Enter question"
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
                      label="Answer"
                      placeholder="Enter answer"
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
                  <label className="text-sm font-medium">Task Image</label>
                  <div className="flex gap-4 items-center">
                    {taskForm.imgUrl && (
                      <Image
                        src={taskForm.imgUrl}
                        alt="Task preview"
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
                      Upload Image
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-sm">Force Locked:</label>
                  <Chip
                    color={taskForm.forceLocked ? 'warning' : 'default'}
                    variant="flat"
                  >
                    {taskForm.forceLocked ? 'Locked' : 'Normal'}
                  </Chip>
                  <Button
                    size="sm"
                    color={taskForm.forceLocked ? 'default' : 'warning'}
                    variant="flat"
                    onClick={() => setTaskForm(prev => ({ ...prev, forceLocked: !prev.forceLocked }))}
                  >
                    {taskForm.forceLocked ? 'Unlock' : 'Lock Task'}
                  </Button>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={saveTask} isLoading={loading}>
                  {editingTask ? 'Update' : 'Create'}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Edit/Create Task Group Modal */}
      <Modal isOpen={isGroupEditOpen} onOpenChange={onGroupEditOpenChange} size="2xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {editingTaskGroup ? 'Edit Task Group' : 'Create Task Group'}
              </ModalHeader>
              <ModalBody className="space-y-4">
                <Input
                  label="Group Title"
                  placeholder="Enter group title"
                  value={taskGroupForm.title}
                  onChange={(e) => setTaskGroupForm(prev => ({ ...prev, title: e.target.value }))}
                />

                <Textarea
                  label="Group Description"
                  placeholder="Enter group description"
                  value={taskGroupForm.description}
                  onChange={(e) => setTaskGroupForm(prev => ({ ...prev, description: e.target.value }))}
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    type="datetime-local"
                    label="Start Time"
                    value={taskGroupForm.startAt ? new Date(taskGroupForm.startAt * 1000).toISOString().slice(0, 16) : ''}
                    onChange={(e) => setTaskGroupForm(prev => ({ 
                      ...prev, 
                      startAt: e.target.value ? Math.floor(new Date(e.target.value).getTime() / 1000) : 0 
                    }))}
                  />
                  <Input
                    type="datetime-local"
                    label="End Time"
                    value={taskGroupForm.endAt ? new Date(taskGroupForm.endAt * 1000).toISOString().slice(0, 16) : ''}
                    onChange={(e) => setTaskGroupForm(prev => ({ 
                      ...prev, 
                      endAt: e.target.value ? Math.floor(new Date(e.target.value).getTime() / 1000) : 0 
                    }))}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Group Image</label>
                  <div className="flex gap-4 items-center">
                    {taskGroupForm.imgUrl && (
                      <Image
                        src={taskGroupForm.imgUrl}
                        alt="Group preview"
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
                          handleGroupFileUpload(file);
                        }
                      }}
                      className="hidden"
                      id="group-image-upload"
                    />
                    <Button
                      as="label"
                      htmlFor="group-image-upload"
                      color="primary"
                      variant="flat"
                      isLoading={groupUploading}
                    >
                      Upload Image
                    </Button>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={saveTaskGroup} isLoading={loading}>
                  {editingTaskGroup ? 'Update' : 'Create'}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
