"use client";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useState } from "react";
import Button from "../(components)/button";
import PaySection from "../(components)/pay-section";
import PaymentMethodSection from "../(components)/payment-method-section";
import PointSection from "../(components)/point-section";
import { useGetPayment } from "../hooks/useGetPayment";
import { usePostCancelPayment } from "../hooks/usePostCancelPayment";
import { usePostPayment } from "../hooks/usePostPayment";
import Loading from "../loading/page";

interface Props {
  token: string;
  // payment: PaymentType;
}

export default function PaymentsInfo({ token }: Props) {
  const [payDisabled, setPayDisabled] = useState<boolean>(false);
  const [pointToUse, setPointToUse] = useState<number>(0);
  const { data: payment, isLoading } = useGetPayment(token);
  const { mutateAsync: cancelPay } = usePostCancelPayment();
  const { mutateAsync: postPay } = usePostPayment(token);

  if (!payment || isLoading) return <Loading />;
  if (payment.status === "FIALED") redirect("/fail");

  const {
    userId,
    orderId,
    orderName,
    redirectUri,
    amount,
    balance,
    pointBalance,
    bankName,
    accountNum,
  } = payment;

  const onClickCancel = async () => {
    await cancelPay({ userId, orderId, reason: "", redirectUri });
  };

  const onClickPay = async () => {
    setPayDisabled(true);
    await postPay({ pointToUse, orderId, amount, redirectUri });
  };

  return (
    <div className="relative h-full flex flex-col justify-between">
      <div>
        <section className="text-center py-20 space-y-2">
          <p className="text-shadow-400 text-base">
            {orderName ?? "잘못된 주문"}
          </p>
          <h1 className="text-white text-3xl font-bold">
            {(amount - pointToUse).toLocaleString()}원
          </h1>
        </section>
        {/** 정보 섹션 */}
        <section className="w-full flex flex-col gap-5 card-title sm:card-title-mb">
          <PaymentMethodSection bankName={bankName} accountNum={accountNum} />
          <PaySection balance={balance} />
          <PointSection
            point={pointBalance}
            amount={amount}
            pointToUse={pointToUse}
            setPointToUse={setPointToUse}
          />
        </section>
      </div>
      {/** 동의 및 결제 섹션 */}
      <section className="flex flex-col  ">
        <div className="flex gap-2">
          <Button
            className="w-[25%] whitespace-nowrap bg-shadow-400"
            onClick={onClickCancel}
          >
            취소
          </Button>
          <Button
            onClick={onClickPay}
            disabled={payDisabled}
            className="flex-1 disabled:opacity-80"
          >
            동의하고 결제하기
          </Button>
        </div>
        <div className="flex gap-2 p-5 w-full justify-center text-sm">
          <Image
            src="/icons/check.svg"
            className="w-5 h-5 inline"
            alt="결제 동의"
            width={100}
            height={100}
          />
          <span className="text-accent-green">필수</span>
          <span className="text-shadow-400">
            결제 정보 확인 및 정보 제공 동의
          </span>
        </div>
      </section>
    </div>
  );
}
