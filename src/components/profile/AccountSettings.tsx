import { Button } from '../ui/button';
import AccountConnection from './AccountConnection';
import CategorySettings from './CategorySettings';

export default function AccountSettings({
  settingsView,
  setSettingsView,
}: {
  settingsView: 'main' | 'categories' | 'account-connect';
  setSettingsView: (view: 'main' | 'categories' | 'account-connect') => void;
}) {
  if (settingsView === 'categories') {
    return (
      <div className="flex flex-col gap-4">
        <CategorySettings />
        <Button
          variant="ghost"
          size="fit"
          onClick={() => setSettingsView('main')}
        >
          ← 뒤로 가기
        </Button>
      </div>
    );
  }

  if (settingsView === 'account-connect') {
    return (
      <div className="flex flex-col gap-4">
        <AccountConnection />
        <Button
          variant="ghost"
          size="fit"
          onClick={() => setSettingsView('main')}
        >
          ← 뒤로 가기
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <Button className="w-full" onClick={() => setSettingsView('categories')}>
        카테고리 관리
      </Button>
      <Button
        className="w-full"
        onClick={() => setSettingsView('account-connect')}
      >
        계좌 연동하기
      </Button>
    </div>
  );
}
