export interface Values {
  name?: string
  sectors?: string[]
  term?: boolean
}

export interface UserData {
  values?: Values
}

export interface UserDataProps {
  userData?: Values
  getUserData: () => void
}

export interface CheckboxesProps {
  values?: Values
  checked?: string[]
  setChecked: React.Dispatch<React.SetStateAction<string[] | undefined>>;
}