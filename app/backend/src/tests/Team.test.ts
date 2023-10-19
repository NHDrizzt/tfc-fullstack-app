import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeamModel from "../database/models/SequelizeTeamModel";
import {teams} from "./mocks/Team.mocks";

chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {

    afterEach(sinon.restore);

    it('should return all teams', async function() {
        sinon.stub(SequelizeTeamModel, 'findAll').resolves(teams as any);

        const { status, body } = await chai.request(app).get('/teams');

        expect(status).to.equal(200);
        expect(body).to.deep.equal(teams);
    });

    it('should return a team by id', async function() {
        sinon.stub(SequelizeTeamModel, 'findByPk').resolves(teams as any);

        const { status, body } = await chai.request(app).get('/teams/1');

        expect(status).to.equal(200);
        expect(body).to.deep.equal(teams);
    });

    it('should return not found if the team doesn\'t exists', async function() {
        sinon.stub(SequelizeTeamModel, 'findByPk').resolves(null);

        const { status, body } = await chai.request(app).get('/teams/1');

        expect(status).to.equal(404);
        expect(body.message).to.equal('Team not found');
    });

});