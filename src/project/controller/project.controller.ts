import { Controller, Post, Body, UseGuards, Get, Param, Delete } from '@nestjs/common';
import { ProjectService } from '../service/project.service';
import { ProjectDto } from '../dto/project.dto';
import { ProjectOwnerPipe } from '../pipe/project.pipe';
import { Project } from '../domain/project';
import { User } from 'src/user/domain/user';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { UsernameAuthGuard } from 'src/auth/guard/username-auth.guard';

/**
 * Controller for 'projects' API.
 * Offers Endpoints to CRUD projects.
 */
@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectController {
    constructor(
        private readonly projectService: ProjectService
    ) { }

    /**
     * Creates a new project.
     * @param project The project that should be created.
     * @returns The project that is created.
     */
    @Post()
    @UseGuards(UsernameAuthGuard)
    async create(@Body(ProjectOwnerPipe) project: ProjectDto): Promise<Project> {
        const owner: any = project.owner;
        return this.projectService.createProject({
            name: project.name,
            displayName: project.displayName,
            owner: owner as User,
            contributors: [],
        });
    }

    /**
     * Gets the project with the given name.
     * @param name The project's name.
     * @returns The project with the given name.
     */
    @Get(':name')
    @UseGuards(UsernameAuthGuard)
    async getProjectByName(@Param('name') name: string): Promise<Project> {
        return this.projectService.findOne(name);
    }

    /**
     * Deletes the project with the given name.
     * @param name The project's name.
     * @returns The project that is deleted.
     */
    @Delete(':name')
    @UseGuards(UsernameAuthGuard)
    async deleteProjectByName(@Param('name') name: string): Promise<Project> {
        return this.projectService.deleteProjectByName(name);
    }
}
