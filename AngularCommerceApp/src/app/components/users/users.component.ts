import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {ChangeUserStatusRequestModel} from 'src/app/models/change-user-status-request-model';
import {ListDataModel} from 'src/app/models/list-data-model';
import {UserModel} from 'src/app/models/user-model';
import {UserService} from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  usersData!: ListDataModel<UserModel>;
  size: number = 10;

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.getUsers();
  }

  onStatusChanged(user: UserModel) {
    this.userService.changeUserStatus(new ChangeUserStatusRequestModel(user.id.toString(), user.isActive)).subscribe({
      next: (v) => {
        if (v.response != null) {
          this.messageService.add({
            severity: v.response!.isSuccessful ? "success" : "warn",
            detail: v.response!.message
          });
        } else if (v.errors != null) {
          this.messageService.add({
            severity: "error",
            detail: `${v.errors.join('\n')}`
          });
        }
      },
      error: (e) => {
        this.messageService.add({
          severity: "error",
          detail: "Something went wrong"
        });
      }
    });
  }

  onPageChange(event: any) {
    this.size = event.rows;
    this.getUsers(event.page);
  }

  private getUsers(page: number = 0) {
    this.userService.getUsers(page, this.size).subscribe({
      next: (v) => {
        if (v.data != null) {
          this.usersData = v.data;
        } else if (v.errors != null) {
          this.messageService.add({
            severity: "error",
            detail: `${v.errors.join('\n')}`
          });
        }
      },
      error: (e) => {
        this.messageService.add({
          severity: "error",
          detail: "Something went wrong"
        });

        console.info(e);
      }
    });
  }

}
