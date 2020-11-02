import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CampaignsRepository } from './campaigns.repository';
import { CampaignRequest } from '../interfaces/campaign-request.interface';
import { UserRequest } from 'src/interfaces/user-request.interface';
import { Campaign } from './campaign.entity';
import { MediaReport } from 'src/interfaces/media-report.interface';
import { Media } from 'src/campaigns/media.entity';
import { MediaRepository } from 'src/campaigns/media.repository';
import { Roles } from 'src/enums/roles.enum';
import { KpiTarget } from 'src/interfaces/kpi-target.interface';
import { MDUser } from 'src/users/users.entity';

@Injectable()
export class CampaignsService {
  constructor(
    @InjectRepository(CampaignsRepository)
    private campaignsRepository: CampaignsRepository,
    @InjectRepository(MediaRepository) private mediaRepository: MediaRepository,
  ) {}

  async createCampaign(
    campaign: CampaignRequest,
    user: UserRequest,
  ): Promise<Campaign> {
    if (user.role !== Roles.MARKETING_MANAGER) {
      throw new UnauthorizedException(
        'Only Marketing Manager can create campaigns!',
      );
    }
    if (campaign.target !== 'Software' && campaign.target !== 'Marketing') {
      throw new BadRequestException('Target must be Software or Marketing');
    }

    if (campaign.startDate > campaign.endDate) {
      throw new BadRequestException('Start date must be before end date.');
    }
    const newCampaign = new Campaign();
    newCampaign.name = campaign.name;
    newCampaign.target = campaign.target;
    newCampaign.startDate = campaign.startDate;
    newCampaign.endDate = campaign.endDate;
    newCampaign.userId = user.id;
    newCampaign.employees = [];
    newCampaign.medias = [];
    try {
      await this.campaignsRepository.save(newCampaign);
      return newCampaign;
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('This campaign name is already in use.');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async getUserCampaigns(user: UserRequest): Promise<Campaign[]> {
    return await this.campaignsRepository.find({ userId: user.id });
  }

  async getCampaignDetails(
    campaignId: number,
    user: UserRequest,
  ): Promise<Campaign> {
    const campaign = await this.getCampaign(campaignId);
    if (campaign.userId !== user.id) {
      throw new UnauthorizedException(
        'You are allowed to see campaign detals only for campaigns you have created.',
      );
    }
    return campaign;
  }

  async addEmployeeToCampaign(
    campaignId: number,
    employee: MDUser,
    user: UserRequest,
  ): Promise<MDUser> {
    if (user.role !== Roles.MARKETING_MANAGER) {
      throw new UnauthorizedException(
        'Only Marketing Manager can add employees!',
      );
    }
    if (employee.role !== Roles.EMPLOYEE) {
      throw new BadRequestException('User is not employee!');
    }
    const campaign = await this.getCampaign(campaignId);
    if (campaign.employees.includes(employee.email)) {
      throw new ConflictException(
        'This employee is already added to this campaign!',
      );
    }
    campaign.employees.push(employee.email);
    await this.campaignsRepository.save(campaign);
    return employee;
  }

  async addMediaToCampaign(
    campaignId: number,
    mediaName: string,
    user: UserRequest,
  ) {
    if (user.role !== Roles.MARKETING_MANAGER) {
      throw new UnauthorizedException(
        'Only Marketing Manager can add medias to campaign!',
      );
    }

    const mediaFound = await this.mediaRepository.find({
      name: mediaName,
      campaignId: campaignId,
    });

    if (mediaFound.length > 0) {
      throw new BadRequestException(
        'This media is already in use for this campaign.',
      );
    }

    const media = new Media();
    media.name = mediaName;
    media.campaignId = campaignId;
    media.likes = 0;
    media.comments = 0;
    media.shares = 0;
    media.clicks = 0;
    media.reach = 0;
    await this.mediaRepository.save(media);
    return media;
  }

  async getMediaOfCampaign(campaignId: number, user: UserRequest) {
    if (user.role !== Roles.MARKETING_MANAGER && user.role !== Roles.EMPLOYEE) {
      throw new UnauthorizedException(
        'Only Marketing Manager or Employee can see medias of campaign!',
      );
    }
    return await this.mediaRepository.find({ campaignId: campaignId });
  }

  async getKPIReport(
    campaignId: number,
    kpiTarget: KpiTarget,
    user: UserRequest,
  ): Promise<MediaReport[]> {
    if (user.role !== Roles.MARKETING_MANAGER) {
      throw new UnauthorizedException(
        'Only Marketing Manager can get KPI report!',
      );
    }

    if (
      kpiTarget.likes < 1 ||
      kpiTarget.comments < 1 ||
      kpiTarget.shares < 1 ||
      kpiTarget.clicks < 1 ||
      kpiTarget.reach < 1
    ) {
      throw new BadRequestException(
        'Please enter targets that are higher than 0',
      );
    }
    const reports = [];

    const medias = await this.mediaRepository.find({ campaignId: campaignId });
    for (const media of medias) {
      media.likes = Math.floor(Math.random() * (+kpiTarget.likes + 200) + 1);
      media.comments = Math.floor(
        Math.random() * (+kpiTarget.comments + 200) + 1,
      );
      media.shares = Math.floor(Math.random() * (+kpiTarget.shares + 200) + 1);
      media.clicks = media.likes + media.comments + media.shares;
      media.reach = media.clicks + media.shares * 5;
      await this.mediaRepository.save(media);
      reports.push(this.fillReport(media));
    }
    return reports;
  }

  private fillReport(media: Media): MediaReport {
    return {
      name: media.name,
      likes: media.likes,
      comments: media.comments,
      shares: media.shares,
      clicks: media.clicks,
      reach: media.reach,
    };
  }

  async getCampaign(id: number): Promise<Campaign> {
    const campaign = await this.campaignsRepository.findOne({ id: id });
    if (!campaign) {
      throw new BadRequestException('No such campaign was found!');
    }
    return campaign;
  }
}
