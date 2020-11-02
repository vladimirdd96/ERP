import { EntityRepository, Repository } from 'typeorm';
import { TrackSheet } from './interfaces/track-sheet.interface';
import { Work } from './workingHours.entity';

@EntityRepository(Work)
export class WorkingHoursRepository extends Repository<Work> {
  constructor() {
    super();
  }
  async getFullTrackSheetForProject(
    projectId: number,
    startTime: Date,
    endTime: Date,
  ): Promise<TrackSheet[]> {
    const trackSheet = await this.createQueryBuilder('wh')
      .leftJoinAndSelect('wh.project', 'project')
      .leftJoinAndSelect('wh.task', 'task')
      .leftJoinAndSelect('wh.user', 'user')
      .where('wh.projectId = :id', { id: projectId })
      .andWhere('(wh.createdAt >= :startTime AND wh.createdAt <= :endTime)', {
        startTime: startTime,
        endTime: endTime,
      })
      .getMany();

    return trackSheet;
  }
}
