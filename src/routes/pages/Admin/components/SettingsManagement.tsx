import { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { Button } from '@nextui-org/react';
import { Input } from '@nextui-org/react';
import { Switch } from '@nextui-org/react';
import { settingsApi } from '@/routes/pages/Admin/adminApi';

export const SettingsManagement = () => {
  const [settings, setSettings] = useState({
    enableInviteCode: false,
    firstTaskId: 0,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Load system settings
  const loadSettings = async () => {
    try {
      setLoading(true);
      const response = await settingsApi.getSettings();
      if (response.code === '200') {
        setSettings({
          enableInviteCode: response.enableInviteCode,
          firstTaskId: response.firstTaskId,
        });
      }
    } catch (error) {
      console.error('加载设置失败:', error);
      setMessage('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  // Update invite code setting
  const updateInviteCodeSetting = async (enabled: boolean) => {
    try {
      setLoading(true);
      const response = await settingsApi.updateEnableInviteCode(enabled);
      if (response.code === '200') {
        setSettings(prev => ({ ...prev, enableInviteCode: enabled }));
        setMessage('Invite code settings updated successfully');
      } else {
        setMessage(response.msg || 'Update failed');
      }
    } catch (error) {
      console.error('更新邀请码设置失败:', error);
      setMessage('Failed to update invite code settings');
    } finally {
      setLoading(false);
    }
  };

  // Update first task ID
  const updateFirstTaskId = async () => {
    try {
      setLoading(true);
      const response = await settingsApi.updateFirstTaskId(settings.firstTaskId);
      if (response.code === '200') {
        setMessage('First task ID updated successfully');
      } else {
        setMessage(response.msg || 'Update failed');
      }
    } catch (error) {
      console.error('更新第一个任务ID失败:', error);
      setMessage('Failed to update first task ID');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">System Settings</h3>
        </CardHeader>
        <CardBody className="space-y-4">
          {/* Invite Code Settings */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Enable Invite Code</h4>
              <p className="text-sm text-gray-500">Control whether to enable invite code functionality</p>
            </div>
            <Switch
              isSelected={settings.enableInviteCode}
              onValueChange={updateInviteCodeSetting}
              isDisabled={loading}
            />
          </div>

          {/* First Task ID Settings */}
          <div className="space-y-2">
            <h4 className="font-medium">First Task ID</h4>
            <p className="text-sm text-gray-500">Set the task ID displayed when users first enter</p>
            <div className="flex gap-2">
              <Input
                type="number"
                value={settings.firstTaskId.toString()}
                onChange={(e) => setSettings(prev => ({ 
                  ...prev, 
                  firstTaskId: parseInt(e.target.value) || 0 
                }))}
                placeholder="Enter task ID"
                className="flex-1"
              />
              <Button
                color="primary"
                onClick={updateFirstTaskId}
                isLoading={loading}
              >
                Update
              </Button>
            </div>
          </div>

          {/* Message Display */}
          {message && (
            <div className={`p-3 rounded-md ${
              message.includes('successful') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            }`}>
              {message}
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};
