import { UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver, ResolveReference } from '@nestjs/graphql';

import { CustomersService } from '../../../services/customers.service';
import { PurchaseService } from '../../../services/purchase.service';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { AuthUser, CurrentUser } from '../../auth/current-user';

import { Customer } from '../models/Customer';

@Resolver(() => Customer)
export class CustomersResolver {
  constructor(
    private customersService: CustomersService,
    private purchasesService: PurchaseService,
  ) { }

  @UseGuards(AuthorizationGuard)
  @Query(() => Customer)
  me(
    @CurrentUser() user: AuthUser
  ) {
    return this.customersService.getCustomerByAuthUserId(user.sub);
  }

  @ResolveField()
  purchases(
    @Parent() customer: Customer
  ) {
    return this.purchasesService.listAllFromCustomer(customer.id)
  }

  @ResolveReference()
  resolveReference(reference: { authUserId: string }) {
    return this.customersService.getCustomerByAuthUserId(reference.authUserId);
  }


}
