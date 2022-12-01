import { Component, OnInit } from '@angular/core';
import { CheckTicketFacade } from '@flight-workspace/boarding/domain';

@Component({
  selector: 'boarding-check-ticket',
  templateUrl: './check-ticket.component.html',
  styleUrls: ['./check-ticket.component.scss'],
})
export class CheckTicketComponent implements OnInit {
  ticketList$ = this.checkTicketFacade.ticketList$;

  constructor(private checkTicketFacade: CheckTicketFacade) {}

  ngOnInit() {
    this.load();
  }

  load(): void {
    this.checkTicketFacade.load();
  }
}
