import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../shared/services/users.service';
import { User } from '../../shared/models/user';
import { Message } from '../../shared/models/message.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FadeStateTrigger } from 'src/app/shared/animations/fade.animation';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [FadeStateTrigger]
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  message: Message;

  constructor(private usersService: UsersService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title,
    private meta: Meta) {
      title.setTitle('Вход в систему');
      meta.addTags([
        {name: 'keywords', content:'логин, вход, система'},
        {name: 'description', content: 'Страница для входа в систему'}
      ])
  }

  onReg() {
    this.router.navigate(['registration'])
  }

  ngOnInit() {
    this.message = new Message('danger', '');
    this.route.queryParams
      .subscribe((params: Params) => {
        if (params['nowCanLogin']) {
          this.showMessage({
            text: 'Теперь вы можете войти в систему',
            type: 'success'
          })
        }else if (params['accessDenied']) {
          this.showMessage({
            text: 'Чтобы войти в систему вам необходимо авторизоваться',
            type: 'warning'
          })
        }
      })

    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  private showMessage(message: Message) {
    this.message = message;
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }

  /*onLogin(){
    this.authService.login();
    this.router.navigate(['/system'])
  }*/

  onSubmit() {
    const formData = this.form.value;

    this.usersService.getUserByEmail(formData.email)
      .subscribe((user: User) => {
        if (user) {
          if (user.password === formData.password) {
            this.message.text = ''
            window.localStorage.setItem('user', JSON.stringify(user))
            this.authService.login()
            this.router.navigate(['/system', 'bill'])
          } else {
            this.showMessage({
              text: 'Пароль не верный',
              type: 'danger'
            });
          }
        } else {
          this.showMessage({
            text: 'Такого пользователя не существует',
            type: 'danger'
          });
        }
      });
  }

}
