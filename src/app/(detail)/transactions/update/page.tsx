import TransactionsContainer from '@/components/transactions/TransactionsContainer';
import { TransactionType } from '@/types/transactions';

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
}) {
  const type = searchParams?.type as TransactionType;
  const id = searchParams?.id;

  if (!type || !id) {
    throw new Error('쿼리 파라미터 누락');
  }

  let data;

  if (type === 'SPEND') {
    // data = await getAccountBookSpendDetail({ id });
  } else if (type === 'INCOME') {
    // data = await getAccountBookIncomeDetail({ id });
  } else {
    throw new Error('지원하지 않는 거래 타입입니다.');
  }

  return (
    <>
      {data && (
        <TransactionsContainer
          transaction={type}
          // defaultValue={data}
        />
      )}
    </>
  );
}
