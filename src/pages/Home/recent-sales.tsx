import { RecentPaymentType } from '@/api/services/payment/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSetLoading } from '@/hooks/useLoading';
import { useGetRecentPayments } from '@/hooks/usePayment';

export function RecentSales() {
  const { data: recent, isPending } = useGetRecentPayments();
  useSetLoading(isPending);

  return (
    <div className="space-y-8">
      {recent?.data.recent.map((payment: RecentPaymentType) => (
        <div key={payment.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={payment.avatar} alt="Avatar" />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{payment.name}</p>
            <p className="text-sm text-muted-foreground">{payment.email}</p>
          </div>
          <div className="ml-auto font-medium">+${payment.amount}</div>
        </div>
      ))}
    </div>
  );
}
