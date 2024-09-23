export interface SubscriptionPlan {
  id: number;
  name: string;
  billing_period_value: number;
  billing_period_unit: string;
  discount: number;
  is_default: boolean;
}
