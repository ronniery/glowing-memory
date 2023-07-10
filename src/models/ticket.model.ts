import date from "date-and-time";

export type TicketStatus = 'open' | 'closed';

export class Ticket {
  public issue: string;
  public client: string;
  public status: TicketStatus;
  public deadline: Date;

  constructor(json: Record<string, string>) {
    this.issue = json.issue;
    this.client = json.client;
    this.status = json.status as TicketStatus;
    this.deadline = new Date(json.deadline);
  }

  getFlagStatus() {
    const today = new Date();

    if (this.status === 'open' && today.getTime() > this.deadline.getTime()) {
      return 'error'; // red
    } else if (this.status === 'open' && today.getTime() < this.deadline.getTime()) {
      return 'warning'; // yellow
    } else {
      return 'success'; // green
    }
  }

  getFormattedDeadline(): string {
    return date.format(new Date(), "DD/MM/YYYY");
  }
}