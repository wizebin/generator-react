import YoBasePrompts from 'yo-base-prompts';

export default async function prompting(yo) {
  const yoBasePrompts = new YoBasePrompts(yo);
  yo.answers = await yoBasePrompts.prompt({
    description: true,
    destination: true,
    githubUsername: true,
    name: true,
    repository: true,
    version: true
  });

  const { install/* , bucket */ } = await yo.optionOrPrompt([
    {
      type: 'confirm',
      name: 'install',
      message: 'Install dependencies',
      default: true
    },
    // {
    //   type: 'input',
    //   name: 'bucket',
    //   message: 'S3 Deployment Bucket',
    // }
  ]);
  yo.answers.install = install;
  // yo.answers.bucket = bucket;

  yo.context = { ...yo.context, ...yo.answers };
}
