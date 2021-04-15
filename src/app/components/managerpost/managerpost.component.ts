import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { AddBlogComponent } from 'src/app/components/add-blog/add-blog.component';
import { BlogService } from 'src/app/services/blog.service';
import { ConfirmationService } from '../confirmation/confirmation.service';


@Component({
  selector: 'app-managerpost',
  templateUrl: './managerpost.component.html',
  styleUrls: ['./managerpost.component.css'],
})
export class ManagerpostComponent implements OnInit {
  posts = null;
  constructor(
    private service: BlogService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.service.get().subscribe((posts) => (this.posts = posts));
  }
  openConfirm(item) {
    //this.modalService.open(ConfirmationComponent);
    //this.deletePost(item);
    console.log(item);


    //let deleteId = item.id;
    this.confirmationService.confirm("Confirmation","Are u sure to delete")
    .then((confirmed) => {
      if(confirmed){
        this.deletePost(item);
      }

    })
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  deletePost(item) {
    const index = this.posts.indexOf(item);
    console.log(index);
    this.posts.splice(index, 1);
    this.service.delete(item.id);

    console.log(this.posts);
  }
  trackByFn(_index, blog) {
    return blog.id;
  }
  openModal() {
    this.modalService.open(AddBlogComponent);
  }
}
function ConfirmationComponent(ConfirmationComponent: any) {
  throw new Error('Function not implemented.');
}

