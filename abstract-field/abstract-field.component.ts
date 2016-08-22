/*
 * This file is part of record-editor.
 * Copyright (C) 2016 CERN.
 *
 * record-editor is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation; either version 2 of the
 * License, or (at your option) any later version.
 *
 * record-editor is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with record-editor; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place, Suite 330, Boston, MA 02111-1307, USA.
 * In applying this license, CERN does not
 * waive the privileges and immunities granted to it by virtue of its status
 * as an Intergovernmental Organization or submit itself to any jurisdiction.
*/
import { Subscription } from 'rxjs/Subscription';

import { AbstractTrackerComponent } from '../abstract-tracker';

import { AppGlobalsService } from '../shared/services';

/**
 * This is the base class for fields
 * WARNING: FieldComponent which extends this class should have AppGlobalsService in their constructor!
 *  EX: constructor(...public appGlobalService: AppGlobalService, ...) {...}
 * 
 * It provides trackByFunction from AbstractTrackerComponent, and handles errors for the component.
 */
export abstract class AbstractFieldComponent extends AbstractTrackerComponent{

  path: string;
  errors: Array<Object> = [];
  errorsSubsciption: Subscription;
  appGlobalsService: AppGlobalsService;

  ngOnInit() {
    this.errorsSubsciption = this.appGlobalsService
      .globalErrorsSubject
      .subscribe((globalErrors) => {
        this.errors = globalErrors[this.path] || [];
      });
  }

  ngOnDestroy() {
    if (this.errorsSubsciption) {
      this.errorsSubsciption.unsubscribe();
    }
  }

  get errorNgClass(): Object {
    return {
      error: this.errors.length > 0
    };
  }

  get isErrorTooltipEnabled(): boolean {
    return this.errors && this.errors.length > 0
  }
}