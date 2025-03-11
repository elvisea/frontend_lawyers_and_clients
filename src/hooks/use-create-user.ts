
import { UserType } from '@/enums/type'
import { useCreateUserStore } from '@/store/create-user/store';

export const useCreateUser = (type: UserType) => {
  const { isLoading, errorCode, createUser, reset } = useCreateUserStore()

  const handleCreateUser = async (data: { name: string; email: string }) => {
    await createUser(type, data)
  }

  return {
    createUser: handleCreateUser,
    isLoading,
    errorCode,
    reset
  }
} 