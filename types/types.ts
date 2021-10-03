export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  taskList?: Maybe<Array<Maybe<Task>>>;
};

export type Task = {
  __typename?: 'Task';
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  status?: Maybe<TaskStatus>;
  title?: Maybe<Scalars['String']>;
};

export enum TaskStatus {
  Cancel = 'CANCEL',
  Doing = 'DOING',
  Success = 'SUCCESS',
  Todo = 'TODO',
}

export type TaskListQueryQueryVariables = Exact<{ [key: string]: never }>;

export type TaskListQueryQuery = {
  __typename?: 'Query';
  taskList?:
    | Array<
        | {
            __typename?: 'Task';
            title?: string | null | undefined;
            description?: string | null | undefined;
            status?: TaskStatus | null | undefined;
          }
        | null
        | undefined
      >
    | null
    | undefined;
};
