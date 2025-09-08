FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /app

COPY bank_simulation.sln .
COPY bank_simulation/bank_simulation.csproj bank_simulation/
COPY bank_simulation_test/bank_simulation_test.csproj bank_simulation_test/

COPY . .

RUN dotnet restore

RUN dotnet test

RUN dotnet publish -c Release

ENV ASPNETCORE_URLS="http://*:5035"

EXPOSE 5035

ENTRYPOINT ["dotnet", "bank_simulation/bin/Release/net8.0/bank_simulation.dll"]