import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardingDomainModule } from '@flight-workspace/boarding/domain';
import { CheckTicketComponent } from './check-ticket.component';

@NgModule({
  imports: [CommonModule, BoardingDomainModule],
  declarations: [CheckTicketComponent],
  exports: [CheckTicketComponent],
})
export class BoardingFeatureCheckTicketModule {}
