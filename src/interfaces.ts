export interface Variable {
  id: string;
  key: string;
  value: string;
}

export interface Stage {
  name: string;
  run_branch: string[];
  except_branch: string[];
  image: string;
  variables: Variable[];
  scripts: string;
  dependencies: string[];
}
