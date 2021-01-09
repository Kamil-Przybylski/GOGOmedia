import { Directive, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appDisabled]',
})
export class DisabledDirective {
  @Input() set appDisabled(condition: boolean | null) {
    const action = !!condition ? 'disable' : 'enable';
    this.ngControl.control?.[action]({ emitEvent: false });
  }

  constructor(private ngControl: NgControl) {}
}
