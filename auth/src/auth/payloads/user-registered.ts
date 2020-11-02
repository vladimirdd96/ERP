import { TopicPayload } from './topic-payload';

export class UserRegistered implements TopicPayload {
  topic: string = 'user_registered';
  constructor(
    private fullName: string,
    private bornon: string,
    private profileId: number,
    private email: string,
    private role: string,
    private salary: number,
  ) {}

  payload(): Object {
    return {
      fullname: this.fullName,
      bornon: this.bornon,
      profileId: this.profileId,
      email: this.email,
      role: this.role,
      salary: this.salary,
    };
  }
}
