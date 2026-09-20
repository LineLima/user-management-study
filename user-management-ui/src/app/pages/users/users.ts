import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User, UserService } from '../../services/user';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  imports: [FormsModule],
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class Users implements OnInit {

  users: User[] = [];

  name = '';
  email = '';
  password = '';
  role = 'Client';

  editingId: number | null = null;
  message = '';
  errorMessage = '';

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: users => {
        this.users = users;
      },
      error: () => {
        this.errorMessage = 'Não foi possível carregar os usuários.';
      }
    });
  }

  saveUser(): void {
    this.message = '';
    this.errorMessage = '';

    const user = {
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role
    };

    if (this.editingId === null) {
      this.userService.createUser(user).subscribe({
        next: () => {
          this.message = 'Usuário criado com sucesso.';
          this.clearForm();
          this.loadUsers();
        },
        error: error => {
          this.errorMessage =
            error.error || 'Erro ao criar usuário.';
        }
      });
    } else {
      this.userService.updateUser(this.editingId, user).subscribe({
        next: () => {
          this.message = 'Usuário atualizado com sucesso.';
          this.clearForm();
          this.loadUsers();
        },
        error: error => {
          this.errorMessage =
            error.error || 'Erro ao atualizar usuário.';
        }
      });
    }
  }

  editUser(user: User): void {
    this.editingId = user.id;
    this.name = user.name;
    this.email = user.email;
    this.role = user.role;
    this.password = '';
  }

  deleteUser(id: number): void {
    if (!confirm('Deseja realmente excluir este usuário?')) {
      return;
    }

    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.message = 'Usuário excluído com sucesso.';
        this.loadUsers();
      },
      error: () => {
        this.errorMessage = 'Erro ao excluir usuário.';
      }
    });
  }

  clearForm(): void {
    this.editingId = null;
    this.name = '';
    this.email = '';
    this.password = '';
    this.role = 'Client';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}