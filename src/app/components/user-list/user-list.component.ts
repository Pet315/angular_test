import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { WeatherDetailsComponent } from '../weather-details/weather-details.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, WeatherDetailsComponent],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UserListComponent implements OnInit {
  users: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((response: any) => {
      this.users = response.results;
    });
  }
}

