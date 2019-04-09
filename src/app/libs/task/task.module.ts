import { NgModule } from '@angular/core';
import { VerifyProjectManageApplyPageComponent } from './pages/verify-project-manage-apply-page/verify-project-manage-apply-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [VerifyProjectManageApplyPageComponent],
    imports: [SharedModule.forRoot(),
    RouterModule.forChild([{ path: "verify-project-manage-apply", component: VerifyProjectManageApplyPageComponent }])],
})
export class TaskModule {

}