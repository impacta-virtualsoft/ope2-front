import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { styled } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router'
import * as React from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useMutation } from 'react-query'
import LogoDH from '~/assets/images/logo-divina-white.svg'
import { useError } from '~/helpers/hooks'
import { getLoginToken, isTokenValid } from '~/service/login'

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/impacta-virtualsoft">
        Virtualsoft
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const GridForImage = styled(Grid)`
  background-image: url('https://source.unsplash.com/random/?login');
  background-repeat: no-repeat;
  background-color: ${({ theme }) =>
    theme.palette.mode === 'light'
      ? theme.palette.grey[50]
      : theme.palette.grey[900]};
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`
const BoxLogoBG = styled(Box)`
  max-height: 30vh;
  width: 100vw;
  background: #fdd835c7;
  display: flex;
  justify-content: flex-end;
  padding-right: 3vw;
`
const LogoWrapper = styled(LogoDH)`
  max-width: 30vw;
  max-height: 30vh;
  filter: drop-shadow(
    0px 0px 10px ${({ theme }) => theme.palette.secondary.main}
  );
`
const BoxForContent = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default function EntrarHome() {
  const router = useRouter()
  const mutation = useMutation(getLoginToken, {
    onSuccess: () => router.push('/'),
  })
  const { errorMessage } = useError({
    isError: mutation.isError,
    error: mutation.error as Error,
  })
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<CredentialRequestType> = async (data) => {
    mutation.mutate(data)
  }

  React.useEffect(() => {
    if (mutation.isLoading) {
      toast.dismiss()
      toast.loading('Verificando credenciais...', {
        duration: 1000,
      })
    }
    if (mutation.isError) {
      toast.dismiss()
      toast.error('Erro ocorreu: ' + errorMessage, {
        duration: 3000,
      })
    }
    if (mutation.isSuccess) {
      toast.dismiss()
      toast.success('Credenciais válidas!', {
        duration: 3000,
      })
    }
  }, [mutation, errorMessage])

  React.useEffect(() => {
    async function checkToken() {
      const req = await isTokenValid()
      if (req) {
        router.push('/')
      }
    }
    checkToken()
  }, [])

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <GridForImage item xs={false} sm={4} md={7}>
        <BoxLogoBG>
          <LogoWrapper />
        </BoxLogoBG>
      </GridForImage>
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <BoxForContent sx={{ my: 8, mx: 4 }}>
          <Avatar sx={{ m: 1, bgcolor: 'info.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Entrar
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 1 }}
          >
            <Controller
              name="email"
              control={control}
              rules={{
                required: 'Email é obrigatório',
              }}
              render={({ field }) => (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  autoComplete="email"
                  color="info"
                  autoFocus
                  error={!!errors?.email}
                  type="email"
                  helperText={
                    errors?.email?.message ? errors.email.message : ''
                  }
                  {...field}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              rules={{
                required: 'Senha é obrigatória',
              }}
              render={({ field }) => (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Senha"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  color="info"
                  error={!!errors?.password}
                  helperText={
                    errors?.password?.message ? errors.password.message : ''
                  }
                  {...field}
                />
              )}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              sx={{ mt: 3, mb: 2 }}
            >
              Entrar
            </Button>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </BoxForContent>
      </Grid>
    </Grid>
  )
}

EntrarHome.CustomLayout = function customLayout(page: React.ReactElement) {
  return <>{page}</>
}

EntrarHome.isPublic = true
