import type { AircraftModel, ConstructorDraft, ConstructorEntity, SCCredentials } from '@/models'
import type { APIComposable } from '@/models/apiInterface'
import { useAuthStore } from '@/stores/authStore'
import { useModelsStore } from '@/stores/modelsStore'
import { storeToRefs } from 'pinia'

export const useFetchApi: APIComposable = () => {
  const authStore = useAuthStore()
  const { savedLogin, savedPassword } = storeToRefs(authStore)
  const { logIn } = authStore

  const modelsStore = useModelsStore()
  const {
    setAircraftModels,
    setAircraftCurrentModel,
    setAircraftTypes,
    setAircraftSubtypes,
    setAircraftEngines,
  } = modelsStore

  const backendPrefix = '/server/aircrafts/api/v2.0'

  const handleResponse = async (response: Response) => {
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'An error occurred')
    }
    return response.json()
  }
  // username == 'vnX7B_WfHqjq' and password == 'mWZtF_W54pgP
  const authenticate = async ({ login, password }: SCCredentials) => {
    if (savedLogin.value && savedPassword.value) {
      logIn({ login: savedLogin.value, password: savedPassword.value })
      return
    }
    const credentials = btoa(`${login}:${password}`)
    try {
      const response = await fetch(`${backendPrefix}/models`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${credentials}`,
        },
      })

      const result = await handleResponse(response)

      if (result.ok) {
        logIn({ login, password })
      }
    } catch (error) {
      console.error('Authentication error:', error)
    }
  }

  const getAircraftModels = async () => {
    const credentials = btoa(`${savedLogin.value}:${savedPassword.value}`)

    try {
      const response = await fetch(`${backendPrefix}/models`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${credentials}`,
        },
      })

      if (response.ok) {
        const { models } = await response.json()

        setAircraftModels(models)
      }
    } catch (error) {
      console.error('Error: ', error)
    }
  }

  const getAircraftModelByID = async (modelID: string) => {
    const credentials = btoa(`${savedLogin.value}:${savedPassword.value}`)

    try {
      const response = await fetch(`${backendPrefix}/models/${modelID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${credentials}`,
        },
      })

      if (response.ok) {
        const { models } = await response.json()

        setAircraftCurrentModel(models)
      }
    } catch (error) {
      console.error('Error: ', error)
    }
  }

  const createAircraftModel = async (modelData: Omit<AircraftModel, 'id'>) => {
    const credentials = btoa(`${savedLogin.value}:${savedPassword.value}`)

    try {
      const response = await fetch(`${backendPrefix}/models`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${credentials}`,
        },
        body: JSON.stringify(modelData),
      })

      if (response.ok) {
        alert(`Model successfully added!`)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const updateAircraftModelByID = async () => {}

  const addEntity = async (
    entity: ConstructorEntity,
    draft: ConstructorDraft,
    modelID?: string,
  ) => {
    const credentials = btoa(`${savedLogin.value}:${savedPassword.value}`)
    try {
      let response
      switch (entity) {
        case 'type':
          response = await fetch(`${backendPrefix}/types`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Basic ${credentials}`,
            },
            body: JSON.stringify(draft),
          })

          if (response.ok) {
            alert(`Type successfully added!`)
            await getEntities('type')
          }
          break
        case 'subtype':
          response = await fetch(`${backendPrefix}/subtypes`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Basic ${credentials}`,
            },
            body: JSON.stringify(draft),
          })

          if (response.ok) {
            alert(`Subtype successfully added!`)
            await getEntities('subtype')
          }
          break

        case 'climb':
        case 'cruise':
        case 'hold':
        case 'descent':
        case 'altitudeCapability':
          if (modelID) {
            response = await fetch(`${backendPrefix}/modes?modelId=${modelID}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${credentials}`,
              },
              body: JSON.stringify(draft),
            })

            if (response.ok) {
              alert(`Mode successfully added!`)
              await getAircraftModelByID(modelID)
            }
          }
          break

        default:
          alert('Unknown entity')
          break
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const getEntities = async (entity: ConstructorEntity) => {
    const credentials = btoa(`${savedLogin.value}:${savedPassword.value}`)

    try {
      let response
      switch (entity) {
        case 'type':
          response = await fetch(`${backendPrefix}/types`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Basic ${credentials}`,
            },
          })

          if (response.ok) {
            const { types } = await response.json()

            setAircraftTypes(types)
          }
          break

        case 'subtype':
          response = await fetch(`${backendPrefix}/subtypes`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Basic ${credentials}`,
            },
          })

          if (response.ok) {
            const { subtypes } = await response.json()

            setAircraftSubtypes(subtypes)
          }
          break
        case 'engine':
          response = await fetch(`${backendPrefix}/engines`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Basic ${credentials}`,
            },
          })

          if (response.ok) {
            const { engines } = await response.json()

            setAircraftEngines(engines)
          }
      }
    } catch (error) {
      alert('Error: ' + error)
    }
  }

  const editEntity = async (
    entity: ConstructorEntity,
    entityId: string,
    draft: ConstructorDraft,
    modelID?: string,
  ) => {
    const credentials = btoa(`${savedLogin.value}:${savedPassword.value}`)

    try {
      let response
      switch (entity) {
        case 'type':
          response = await fetch(`${backendPrefix}/types/${entityId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Basic ${credentials}`,
            },
            body: JSON.stringify(draft),
          })

          if (response.ok) {
            alert(`Entity ${entity} successfully edited!`)
            await getEntities('type')
          }
          break

        case 'subtype':
          response = await fetch(`${backendPrefix}/subtypes/${entityId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Basic ${credentials}`,
            },
            body: JSON.stringify(draft),
          })

          if (response.ok) {
            alert(`Entity ${entity} successfully edited!`)
            await getEntities('subtype')
          }
          break

        case 'climb':
        case 'cruise':
        case 'hold':
        case 'descent':
        case 'altitudeCapability':
          if (modelID) {
            response = await fetch(`${backendPrefix}/modes?modelId=${modelID}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${credentials}`,
              },
              body: JSON.stringify(draft),
            })

            if (response.ok) {
              alert(`Mode successfully added!`)
              await getAircraftModelByID(modelID)
            }
          }
          break

        default:
          alert('Unknown entity')
          break
      }
    } catch (error) {
      alert('Error: ' + error)
    }
  }

  const deleteEntity = async () => {}

  return {
    authenticate,
    addEntity,
    getEntities,
    editEntity,
    deleteEntity,
    createAircraftModel,
    getAircraftModels,
    getAircraftModelByID,
    updateAircraftModelByID,
  }
}
