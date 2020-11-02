import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CampaignRequest } from 'src/interfaces/campaign-request.interface';
import { UserRequest } from 'src/interfaces/user-request.interface';
import { UsersService } from 'src/users/users.service';
import { Campaign } from './campaign.entity';
import { CampaignsService } from './campaigns.service';
import { GetUser } from '../decorators/get-user.decorator';
import { MediaReport } from 'src/interfaces/media-report.interface';
import { CampaignDateParse } from 'src/pipes/campaign-date.pipe';
import { KpiTarget } from 'src/interfaces/kpi-target.interface';
import { MDUser } from 'src/users/users.entity';

@Controller('campaigns')
@UseGuards(AuthGuard())
export class CampaignsController {
  constructor(
    private campaignsService: CampaignsService,
    private usersService: UsersService,
  ) {}

  @Post('')
  @UseGuards(AuthGuard())
  async addCampaign(
    @Body(CampaignDateParse) campaign: CampaignRequest,
    @GetUser() user: UserRequest,
  ): Promise<Campaign> {
    const newCampaign = await this.campaignsService.createCampaign(
      campaign,
      user,
    );
    return newCampaign;
  }

  @Get('')
  @UseGuards(AuthGuard())
  async getUserCampaigns(@GetUser() user: UserRequest): Promise<Campaign[]> {
    const userCampaigns = await this.campaignsService.getUserCampaigns(user);
    return userCampaigns;
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async getCampaignDetails(
    @Param('id') id: number,
    @GetUser() user: UserRequest,
  ): Promise<Campaign> {
    const campaign = await this.campaignsService.getCampaignDetails(id, user);
    return campaign;
  }

  @Post(':id/employee')
  @UseGuards(AuthGuard())
  async addEmployeeToCampaign(
    @Param('id') campaignId: number,
    @Body('userId') userId: number,
    @GetUser() user: UserRequest,
  ): Promise<MDUser> {
    const employee = await this.usersService.getUserById(userId);
    return await this.campaignsService.addEmployeeToCampaign(
      campaignId,
      employee,
      user,
    );
  }

  @Post(':id/media')
  @UseGuards(AuthGuard())
  async addMediaToCampaign(
    @Param('id') campaignId: number,
    @Body('mediaName') mediaName: string,
    @GetUser() user: UserRequest,
  ) {
    return await this.campaignsService.addMediaToCampaign(
      campaignId,
      mediaName,
      user,
    );
  }

  @Get(':id/media')
  @UseGuards(AuthGuard())
  async getMediaOfCampaign(
    @Param('id') campaignId: number,
    @GetUser() user: UserRequest,
  ) {
    return await this.campaignsService.getMediaOfCampaign(campaignId, user);
  }

  @Post(':id/report')
  @UseGuards(AuthGuard())
  async getCampaignReport(
    @Param('id') campaignId: number,
    @Body() kpiTarget: KpiTarget,
    @GetUser() user: UserRequest,
  ): Promise<MediaReport[]> {
    return await this.campaignsService.getKPIReport(
      campaignId,
      kpiTarget,
      user,
    );
  }
}
