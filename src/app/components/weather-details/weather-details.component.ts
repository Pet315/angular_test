import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WeatherDetailsComponent implements OnInit {
  @Input() latitude!: number;
  @Input() longitude!: number;

  weather: any;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    if (this.latitude && this.longitude) {
      this.weatherService.getWeather(this.latitude, this.longitude).subscribe({
        next: (response) => {
          this.weather = response.current_weather;
        },
        error: (err) => {
          console.error('Error loading weather data:', err);
        }
      });
    } else {
      console.warn('Latitude and Longitude must be provided.');
    }
  }

  getWeatherIcon(weatherCode: number, isDay: boolean): { iconPath: string, description: string } {
    const weatherIcons: { [key: number]: string } = {
      0: 'clear_sky',
      1: 'partly_cloudy',
      2: 'cloudy',
      3: 'overcast',
      5: 'light_rain',
      6: 'moderate_rain',
      7: 'heavy_rain',
      8: 'showers',
      11: 'snow',
      12: 'sleet',
      13: 'thunderstorm',
      50: 'mist',
    };
  
    // Визначення опису погоди
    const descriptions: { [key: number]: string } = {
      0: 'Clear sky',
      1: 'Partly cloudy',
      2: 'Cloudy',
      3: 'Overcast',
      5: 'Light rain',
      6: 'Moderate rain',
      7: 'Heavy rain',
      8: 'Showers',
      11: 'Snow',
      12: 'Sleet',
      13: 'Thunderstorm',
      50: 'Mist',
    };
  
    let icon = weatherIcons[weatherCode];

    if (!icon) {
      icon = 'clear_sky';
    } 

    icon += (isDay ? '_day' : '_night');

    let description = descriptions[weatherCode];

    if (!description) {
      description = `Specific weather code: ${weatherCode}`;
    } 
  
    return { iconPath: `${icon}.png`, description };
  }
}

