import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Machine } from '../machine.model';
import { MachinesService } from '../machine.service';

@Component({
  selector: 'app-machine-create',
  templateUrl: './machine-create.component.html',
  styleUrls: ['./machine-create.component.css'],
})
export class MachineCreateComponent implements OnInit {
  private mode = 'create';
  private machineId: string;
  machine: Machine;

  constructor(
    public machineService: MachinesService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'edit';
        this.machineId = paramMap.get('id');
        this.machineService
          .getMachine(this.machineId)
          .subscribe((machineData) => {
            this.machine = {
              id: machineData._id,
              name: machineData.name,
              type: machineData.type,
              signal: machineData.signal,
              angSignal: machineData.angSignal,
              modbus: machineData.modbus,
            };
          });
      } else {
        this.mode = 'create';
        this.machineId = null;
      }
    });
  }

  onSaveMachine(form: NgForm) {
    if (form.invalid) {
      return;
    }

    if (this.mode === 'create') {
      this.machineService.addMachine(
        form.value.name,
        form.value.type,
        form.value.signal,
        form.value.angSignal,
        form.value.modbus
      );
    } else {
      this.machineService.updateMachine(
        this.machineId,
        form.value.name,
        form.value.type,
        form.value.signal,
        form.value.angSignal,
        form.value.modbus
      );
    }
    console.log(form);
    form.resetForm();
    console.log('Form submited');
  }
}
