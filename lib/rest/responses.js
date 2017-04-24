export const OFFLINE = (
  {
    error: {
      code,
    } = {},
  } = {},
) => code === 404;

export const BAD_JOB = (
  {
    job,
  } = {},
) => job === null;

export const JOB_STAGE_PREHEATING = (
  {
    job_stage: stage,
  } = {},
) => stage === 'preheating';

export const JOB_STAGE_COOKING = (
  {
    job_stage: stage,
  } = {},
) => stage === 'cooking';
