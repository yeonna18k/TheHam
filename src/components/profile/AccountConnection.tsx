import BANK_LIST from '@/constants/bankList';
import { Info } from 'lucide-react';
import { Button } from '../ui/button';
import { Input, PasswordInput } from '../ui/input';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export default function AccountConnection() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Label>은행</Label>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="계좌를 선택해주세요" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {BANK_LIST.map((bank) => (
                <SelectItem key={bank.code} value={bank.code}>
                  {bank.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <p className="text-gray-500 body3 flex gap-1 items-center">
          <Info size={16} className="text-gray-500" />
          광주/부산/산업/수협/신협/제주은행은
          <br />
          아이디 로그인을 지원하지 않습니다
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <Label>계좌 번호</Label>
        <Input placeholder="계좌번호를 입력하세요" />
      </div>
      <div className="flex flex-col gap-2">
        <Label>아이디</Label>
        <Input placeholder="아이디를 입력하세요" />
      </div>
      <div className="flex flex-col gap-2">
        <Label>비밀번호</Label>
        <PasswordInput placeholder="비밀번호를 입력하세요" name="password" />
      </div>
      <Button>연동하기</Button>
    </div>
  );
}
