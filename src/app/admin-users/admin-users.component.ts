import { Component } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css'
})
export class AdminUsersComponent {

  users: any[] = [];
  loading = true;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.adminService.getAllUsers().subscribe({
      next: (res: any) => {
        this.users = res;
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      }
    });
  }

  makeAdmin(id: string) {
    this.adminService.makeAdmin(id).subscribe({
      next: () => {
        this.loadUsers();
      }
    });
  }

  blockUser(id: string) {
    this.adminService.blockUser(id).subscribe(() => {
      this.loadUsers();
    });
  }

  unblockUser(id: string) {
    this.adminService.unblockUser(id).subscribe(() => {
      this.loadUsers();
    });
  }
}