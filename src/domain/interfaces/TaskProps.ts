import { Props } from "@core/domain/Props";

interface TaskProps extends Props{
  readonly title: string;
  readonly description: string;
  readonly state: string;
  readonly targetDate: Date;
}

export { TaskProps };