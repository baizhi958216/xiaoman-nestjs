export class CreateManagerDto {
  name: string;
  money: number;
}

export class transferMoneyDto {
  fromId: number; //发起人
  toId: number; //接受人
  money: number; //金额
}
