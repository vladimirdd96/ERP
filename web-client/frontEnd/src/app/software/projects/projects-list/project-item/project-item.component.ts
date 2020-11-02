import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../../project.model';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.css'],
})
export class ProjectItemComponent implements OnInit {
  @Input() project: Project;
  @Input() id: number;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {}

  // getProject() {
  //   this.router.navigate([`${this.id}`], { relativeTo: this.route });
  // }
}
