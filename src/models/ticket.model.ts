import date from 'date-and-time';

export type TicketStatus = 'open' | 'closed';

export class Ticket {
  public _id?: string;
  public issue: string;
  public client: string;
  public status: TicketStatus;
  public deadline: Date;

  constructor(json: Record<string, string | Date>) {
    const id = (json.id ?? json._id) as string;

    if (id) {
      this._id = id;
    }

    this.issue = json.issue as string;
    this.client = json.client as string;
    this.status = json.status as TicketStatus;
    this.deadline = new Date(json.deadline);
  }

  getFlagStatus(): 'error' | 'warning' | 'success' {
    const today = new Date();

    if (this.status === 'open' && today.getTime() > this.deadline.getTime()) {
      return 'error'; // red
    } else if (this.status === 'open' && today.getTime() < this.deadline.getTime()) {
      return 'warning'; // yellow
    } else {
      return 'success'; // green
    }
  }

  getOppositeStatus(): TicketStatus {
    return this.status === 'open' ? 'closed' : 'open';
  }

  getFormattedDeadline(): string {
    return date.format(this.deadline, 'DD/MM/YYYY');
  }
}
