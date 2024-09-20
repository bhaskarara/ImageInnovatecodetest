import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit  {
  user: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const username = this.route.snapshot.paramMap.get('username');
    this.http.get(`https://api.github.com/users/${username}`).subscribe(data => {
      this.user = data;
    });
  
    this.http.get(`https://api.github.com/users/${username}/followers`).subscribe((followers: any) => {
      const followerNames = followers.map((f: { login: any; }) => f.login);
      const followerCount = followers.map((f: { followers: any; }) => f.followers); 
      this.createChart(followerNames, followerCount);
    });
  
  }
  createChart(labels: string[], data: number[]) {
    const ctx = document.getElementById('myChart')as HTMLCanvasElement | null;
    if (ctx) {
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: '# of Followers',
          data: data,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
    });
  }
  }
  }


