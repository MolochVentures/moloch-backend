import {
  Filter,
  repository,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  patch,
  requestBody,
} from '@loopback/rest';
import { Project } from '../models';
import { ProjectRepository } from '../repositories';

export class ProjectController {
  constructor(
    @repository(ProjectRepository)
    public projectRepository: ProjectRepository,
  ) { }

  /**
   * Returns all existing projects.
   */
  @get('/projects', {
    responses: {
      '200': {
        description: 'Returned all projects.',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Project } },
          },
        },
      },
    },
  })
  async findAll(): Promise<Project[]> {
    return await this.projectRepository.find();
  }

  /**
   * Returns a project filtered by its id.
   * @param id: id of the project to be returned.
   */
  @get('/projects/{id}', {
    responses: {
      '200': {
        description: 'Returned project by id.',
        content: { 'application/json': { schema: { 'x-ts-type': Project } } },
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Project> {
    return await this.projectRepository.findById(id);
  }

  /**
   * Returns projects filtered according to the request's data.
   * @param filter: filter to query the projects.
   */
  @get('/projects/getfiltered', {
    responses: {
      '200': {
        description: 'Returned filtered projects.',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Project } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Project)) filter?: Filter,
  ): Promise<Project[]> {
    return await this.projectRepository.find(filter);
  }

  /**
   * Creates a project.
   * @param project: project to be created.
   */
  @post('/projects', {
    responses: {
      '200': {
        description: 'Project created.',
        content: { 'application/json': { schema: { 'x-ts-type': Project } } },
      },
    },
  })
  async create(@requestBody() project: Project): Promise<Project> {
    var S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    project.id = (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    project.status = 'pending';
    project.period = 0;
    return await this.projectRepository.create(project).then(result => { return project });
  }

  /**
   * Modifies a project.
   * @param id: id of the project to be modified.
   * @param project: data to modify the project.
   */
  @patch('/projects/{id}', {
    responses: {
      '204': {
        description: 'Project modified.',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() project: Project,
  ): Promise<void> {
    await this.projectRepository.updateById(id, project);
  }
}
