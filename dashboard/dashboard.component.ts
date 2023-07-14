import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DashboardStats } from 'src/app/models/dashboard-stats.model';
import { VitalAggregateSummary } from 'src/app/models/vital-summary.model';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  dashboardStats!: VitalAggregateSummary;
  loading = false;
  form!: FormGroup;
  constructor(private reportService: ReportService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getDashboardSummary(new Date());
    this.form = this.fb.group({
      as_at: ['', [Validators.required]],
    });
  }
  getDashboardSummary(asAt: Date) {
    this.loading = true;
    this.reportService.getDashboadStarts(asAt).subscribe({
      next: ({ vitalAggregateSummary }) => {
        this.dashboardStats = vitalAggregateSummary;
        console.log(this.dashboardStats);
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
      },
    });
  }
  handleDateChange(): void {
    this.getDashboardSummary(this.form.value.as_at);
  }

  disabledDate = (current: Date): boolean => {
    // Disable dates before today
    return current > new Date();
  };
}
