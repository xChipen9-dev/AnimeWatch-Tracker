import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyListService } from '../../core/services/my-list/my-list.service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statistics.html',
  styleUrl: './statistics.css'
})
export class StatisticsComponent implements AfterViewInit {

  total = 0;
  favorites = 0;
  averageUserScore = 0;
  averageApiScore = 0;

  countsByState: Record<string, number> = {};

  constructor(private myList: MyListService) {}

  ngAfterViewInit(): void {
    const items = this.myList.getAll();

    this.total = items.length;
    this.favorites = items.filter(i => i.favorite).length;

    const userScores = items
      .filter(i => i.userScore !== null)
      .map(i => i.userScore!);

    const apiScores = items
      .filter(i => i.apiScore !== null)
      .map(i => i.apiScore!);

    this.averageUserScore = userScores.length
      ? userScores.reduce((a, b) => a + b, 0) / userScores.length
      : 0;

    this.averageApiScore = apiScores.length
      ? apiScores.reduce((a, b) => a + b, 0) / apiScores.length
      : 0;

    this.countsByState = {
      PENDIENTE: items.filter(i => i.state === 'PENDIENTE').length,
      VIENDO: items.filter(i => i.state === 'VIENDO').length,
      COMPLETADO: items.filter(i => i.state === 'COMPLETADO').length,
      ABANDONADO: items.filter(i => i.state === 'ABANDONADO').length
    };

    this.renderStateChart();
    this.renderScoreChart();
  }

  renderStateChart() {
    new Chart('stateChart', {
      type: 'pie',
      data: {
        labels: ['Pendiente', 'Viendo', 'Completado', 'Abandonado'],
        datasets: [
          {
            data: [
              this.countsByState['PENDIENTE'],
              this.countsByState['VIENDO'],
              this.countsByState['COMPLETADO'],
              this.countsByState['ABANDONADO']
            ],
            backgroundColor: [
              '#ffb703', 
              '#4dabf7', 
              '#51cf66', 
              '#ff6b6b'  
            ],
            borderWidth: 0
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            display: false   
          }
        }
      }
    });
  }

  renderScoreChart() {
    new Chart('scoreChart', {
      type: 'bar',
      data: {
        labels: ['MyAnimeList', 'Tu nota'],
        datasets: [
          {
            data: [
              this.averageApiScore,
              this.averageUserScore
            ],
            backgroundColor: [
              '#4dabf7',
              '#ff4f6d'
            ],
            borderRadius: 10
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            display: false   
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: '#ffffff'
            },
            grid: {
              color: 'rgba(255,255,255,0.1)'
            }
          },
          x: {
            ticks: {
              color: '#ffffff'
            },
            grid: {
              display: false
            }
          }
        }
      }
    });
  }
}
