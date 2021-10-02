import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Machine } from './machine.model';

@Injectable({ providedIn: 'root' })
export class MachinesService {
  private machines: Machine[] = [];
  private machinesUpdated = new Subject<Machine[]>();

  constructor(private http: HttpClient, public router: Router) {}

  getMachines() {
    this.http
      .get<{ message: string; machines: any }>(
        'http://localhost:3000/api/machines'
      )
      .pipe(
        map((machineData) => {
          return machineData.machines.map((machine) => {
            return {
              name: machine.name,
              type: machine.type,
              signal: machine.signal,
              angSignal: machine.angSignal,
              modbus: machine.modbus,
              id: machine._id,
            };
          });
        })
      )
      .subscribe((machineData) => {
        this.machines = machineData;
        this.machinesUpdated.next([...this.machines]);
      });
    // return this.machines;
  }

  getMachineUpdateListener() {
    return this.machinesUpdated.asObservable();
  }

  getMachine(id: string) {
    return this.http.get<{
      _id: string;
      name: string;
      type: string;
      signal: string;
      angSignal: string;
      modbus: number;
    }>('http://localhost:3000/api/machines/' + id);
  }

  addMachine(
    name: string,
    type: string,
    signal: string,
    angSignal: string,
    modbus: number
  ) {
    const machine: Machine = {
      id: null,
      name: name,
      type: type,
      signal: signal,
      angSignal: angSignal,
      modbus: modbus,
    };
    console.log(machine);
    this.http
      .post<{ message: string; machineId: string }>(
        'http://localhost:3000/api/machines',
        machine
      )
      .subscribe((responseData) => {
        console.log(responseData.message);
        const id = responseData.machineId;
        machine.id = id;
        this.machines.push(machine);
        this.machinesUpdated.next([...this.machines]);
        this.router.navigate(['/']);
      });
  }

  updateMachine(
    id: string,
    name: string,
    type: string,
    signal: string,
    angSignal: string,
    modbus: number
  ) {
    const machine: Machine = {
      id: id,
      name: name,
      type: type,
      signal: signal,
      angSignal: angSignal,
      modbus: modbus,
    };
    this.http
      .put('http://localhost:3000/api/machines/' + id, machine)
      .subscribe((res) => {
        const updatedMachines = [...this.machines];
        const oldMachineIndex = updatedMachines.findIndex(
          (m) => m.id === machine.id
        );
        updatedMachines[oldMachineIndex] = machine;
        this.machines = updatedMachines;
        this.machinesUpdated.next([...this.machines]);
        this.router.navigate(['/']);
      });
  }

  deleteMachine(machineId: string) {
    this.http
      .delete('http://localhost:3000/api/machines/' + machineId)
      .subscribe(() => {
        console.log('Deleted!');
        const updatedMachines = this.machines.filter(
          (machine) => machine.id !== machineId
        );
        this.machines = updatedMachines;
        this.machinesUpdated.next([...this.machines]);
      });
  }
}
