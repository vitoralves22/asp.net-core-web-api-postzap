import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/service';
import { PostService } from 'src/app/shared/service/post.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css'],
})
export class PostFormComponent implements OnInit {
  public postForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private rest: PostService,
    private auth: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.postForm = this.fb.group({
      titulo: ['', [Validators.required]],
      conteudo: ['', [Validators.required]],
    });
  }

  createPost() {
    console.log(this.postForm.value);
    this.rest.postPosts(this.postForm.value).subscribe((result) => {});
    this.postForm.reset();
    window.location.reload();
  }

  deletePost(id: number) {
    this.rest.deletePost(id).subscribe((d) => {});
    setTimeout(function () {
      window.location.reload();
    }, 1000);
  }

  cancel() {
    this.postForm.reset();
  }
}