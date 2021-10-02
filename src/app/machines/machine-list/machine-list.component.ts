import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Machine } from '../machine.model';
import { MachinesService } from '../machine.service';

import { faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-machine-list',
  templateUrl: './machine-list.component.html',
  styleUrls: ['./machine-list.component.css'],
})
export class MachineListComponent implements OnInit, OnDestroy {
  faTrash = faTrashAlt;
  faPen = faPen;
  machines: Machine[] = [];
  public userIsAuthenticated = false;
  private machinesSub: Subscription;
  private authStatusSub: Subscription;

  constructor(
    public machinesService: MachinesService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.machinesService.getMachines();
    this.machinesSub = this.machinesService
      .getMachineUpdateListener()
      .subscribe((machines: Machine[]) => {
        this.machines = machines;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  onDelete(machineId: string) {
    this.machinesService.deleteMachine(machineId);
  }

  ngOnDestroy() {
    this.machinesSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
