import TransactionsContainer from '@/components/transactions/TransactionsContainer';
import { TransactionType } from '@/types/transactions';

export default async function page({
  searchParams,
}: {
  searchParams: {
    type: TransactionType;
    id: string;
  };
}) {
  const type = searchParams.type;
  const id = searchParams.id;

  let data;
  let posts;

  if (type === 'SPEND') {
    // data = await getAccountBookSpendDetail({ id });
  } else if (type === 'INCOME') {
    // data = await getAccountBookIncomeDetail({ id });
  } else {
    throw new Error('지원하지 않는 거래 타입입니다.');
  }

  console.log(data);
  console.log(posts);

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
