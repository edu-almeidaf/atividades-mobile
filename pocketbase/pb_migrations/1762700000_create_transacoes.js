migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('users');

    const ownerRule = 'user = @request.auth.id';

    const transacoes = new Collection({
      type: 'base',
      name: 'transacoes',
      listRule: ownerRule,
      viewRule: ownerRule,
      createRule: '@request.auth.id != "" && @request.body.user = @request.auth.id',
      updateRule: ownerRule + ' && (@request.body.user:isset = false || @request.body.user = @request.auth.id)',
      deleteRule: ownerRule,
      fields: [
        { type: 'text', name: 'descricao', required: true, max: 100 },
        { type: 'number', name: 'valor', required: true, min: 0.01 },
        { type: 'select', name: 'tipo', required: true, maxSelect: 1, values: ['entrada', 'saida'] },
        {
          type: 'relation',
          name: 'user',
          required: true,
          collectionId: users.id,
          maxSelect: 1,
          cascadeDelete: true,
        },
        { type: 'autodate', name: 'created', onCreate: true, onUpdate: false },
        { type: 'autodate', name: 'updated', onCreate: true, onUpdate: true },
      ],
    });
    app.save(transacoes);

    const superusers = app.findCollectionByNameOrId('_superusers');
    const admin = new Record(superusers);
    admin.setEmail('admin@minhasfinancas.com');
    admin.setPassword('admin12345');
    app.save(admin);

    const user = new Record(users);
    user.setEmail('teste@teste.com');
    user.setPassword('12345678');
    user.setVerified(true);
    user.set('name', 'Usuário Teste');
    app.save(user);
  },
  (app) => {
    app.delete(app.findCollectionByNameOrId('transacoes'));

    try {
      app.delete(app.findAuthRecordByEmail('users', 'teste@teste.com'));
    } catch (_) {}

    try {
      app.delete(app.findAuthRecordByEmail('_superusers', 'admin@minhasfinancas.com'));
    } catch (_) {}
  },
);
